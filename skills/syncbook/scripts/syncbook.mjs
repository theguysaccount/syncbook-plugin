#!/usr/bin/env node
// Syncbook's original, dependency-free adapter for an agent running in a terminal.
// It reads only the explicit draft file supplied by the user/agent. It never scans memory.
import { readFile, writeFile, mkdir, chmod } from 'node:fs/promises';
import { homedir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const args=process.argv.slice(2),index=args.indexOf('--origin');
const requested=index>=0?args.splice(index,2)[1]:(process.env.SYNCBOOK_ORIGIN||'https://syncbook.org');
const url=new URL(requested),origin=url.origin;
const local=['localhost','127.0.0.1','[::1]'].includes(url.hostname);
if(url.username||url.password||!['https:','http:'].includes(url.protocol)||(!local&&url.protocol!=='https:'))throw new Error('Use HTTPS for a public Syncbook host, without URL credentials.');
if(!local&&!['https://syncbook.org','https://common-horizon.cuelayer.workers.dev'].includes(origin))throw new Error('Use the canonical Syncbook host or its documented fallback.');
const directory=process.env.SYNCBOOK_STATE_DIR||join(homedir(),'.config','syncbook');
const file=join(directory,createHash('sha256').update(origin).digest('hex').slice(0,20)+'.json');
const [command='help',...values]=args;
async function state(){try{const s=JSON.parse(await readFile(file,'utf8'));if(s.origin!==origin)throw new Error('Wrong host');return s;}catch{throw new Error('Prepare a draft first, using this same origin. Your owner must approve agent access.');}}
async function store(s){await mkdir(directory,{recursive:true,mode:0o700});await chmod(directory,0o700);await writeFile(file,JSON.stringify(s,null,2),{mode:0o600});await chmod(file,0o600);}
async function input(path){if(!path)throw new Error('Supply a profile or plan JSON file.');const raw=await readFile(path,'utf8');if(Buffer.byteLength(raw)>1048576)throw new Error('Keep each request under 1 MiB; add longer material as successive context entries.');return JSON.parse(raw);}
async function call(path,method='GET',data,privateAccess=false){const headers={};if(data!==undefined)headers['Content-Type']='application/json';if(privateAccess)headers.Authorization='Bearer '+(await state()).agentToken;const r=await fetch(origin+path,{method,headers,body:data===undefined?undefined:JSON.stringify(data),signal:AbortSignal.timeout(15000)});const v=await r.json();if(!r.ok)throw new Error(v.error||`HTTP ${r.status}`);return v;}
try{
  if(command==='help')console.log(`Syncbook terminal adapter\n\nnode syncbook.mjs guide [--origin HTTPS_URL]\nnode syncbook.mjs preview profile.json\nnode syncbook.mjs prepare profile.json\nnode syncbook.mjs status\nnode syncbook.mjs connect < private-token.txt\nnode syncbook.mjs preferences\nnode syncbook.mjs feedback feedback.json\nnode syncbook.mjs weekly\nnode syncbook.mjs checkin review.json\nnode syncbook.mjs me\nnode syncbook.mjs matches\nnode syncbook.mjs context [me|MEMBER_UUID] [QUERY] [NEXT_CURSOR]\nnode syncbook.mjs context-entry ENTRY_UUID [MEMBER_UUID]\nnode syncbook.mjs capture entry.json\nnode syncbook.mjs connection OTHER_MEMBER_UUID\nnode syncbook.mjs potentials OTHER_MEMBER_UUID analysis.json\nnode syncbook.mjs choose OTHER_MEMBER_UUID POTENTIAL_ID\nnode syncbook.mjs proposals\nnode syncbook.mjs draft OTHER_MEMBER_UUID [plan.json]\nnode syncbook.mjs revise PROPOSAL_UUID plan.json CURRENT_REVISION\n\nTokens stay in the user's private local config. This adapter cannot approve commitments.\nIt reads only a supplied JSON file; the agent synthesizes authorized memory before calling it.\n`);
  else if(command==='connect'){let raw='';for await(const chunk of process.stdin){raw+=chunk;if(raw.length>200)throw new Error('Supply only one private Syncbook agent token on stdin.');}raw=raw.trim();if(!/^cha_[a-f0-9]{64}$/.test(raw))throw new Error('Supply a scoped agent token, never a recovery key.');const r=await fetch(origin+'/api/me',{headers:{Authorization:'Bearer '+raw},signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error('This token is pending, expired, or revoked.');await store({origin,agentToken:raw});console.log('Scoped token saved privately. No public changes made.');}
  else if(command==='preferences')console.log(JSON.stringify(await call('/api/me/preferences','GET',undefined,true),null,2));
  else if(command==='feedback')console.log(JSON.stringify(await call('/api/feedback','POST',await input(values[0]),true),null,2));
  else if(command==='weekly')console.log(JSON.stringify(await call('/api/me/weekly','GET',undefined,true),null,2));
  else if(command==='checkin')console.log(JSON.stringify(await call('/api/me/weekly','POST',await input(values[0]),true),null,2));
  else if(command==='guide'){const r=await fetch(origin+'/join.md',{signal:AbortSignal.timeout(15000)});if(!r.ok)throw new Error(`HTTP ${r.status}`);console.log(await r.text());}
  else if(command==='preview')console.log(JSON.stringify(await call('/api/profile/preview','POST',await input(values[0])),null,2));
  else if(command==='prepare'){
    const d=await call('/api/enrollments','POST',await input(values[0]));
    await store({origin,enrollmentId:d.enrollmentId,agentToken:d.agentToken,verificationUrl:d.verificationUrl,fallbackVerificationUrl:d.fallbackVerificationUrl,expiresAt:d.expiresAt});
    console.log(`Private draft prepared. No profile has been published.\nGive this private review link only to your person:\n${d.verificationUrl}${d.fallbackVerificationUrl?'\n\nIf their browser cannot reach the new domain, this opens the same draft immediately:\n'+d.fallbackVerificationUrl:''}\n\nAgent token saved with private file permissions. Check status after the person reviews it.`);
  }else if(command==='status'){const s=await state();if(!s.enrollmentId)throw new Error('This is an existing scoped grant. Use me to check access.');console.log(JSON.stringify(await call(`/api/enrollments/${s.enrollmentId}/status`,'POST',{agentToken:s.agentToken}),null,2));}
  else if(['me','matches','proposals'].includes(command))console.log(JSON.stringify(await call('/api/'+command,'GET',undefined,true),null,2));
  else if(command==='context'){const memberId=values[0],query=values[1]||'',cursor=values[2]||'',own=!memberId||memberId==='me';console.log(JSON.stringify(await call((own?'/api/me/context':'/api/members/'+encodeURIComponent(memberId)+'/context')+'?'+new URLSearchParams({q:query,cursor}),'GET',undefined,own),null,2));}
  else if(command==='context-entry'){const entryId=values[0],memberId=values[1];if(!entryId)throw new Error('Supply a context entry UUID.');console.log(JSON.stringify(await call(memberId?'/api/members/'+encodeURIComponent(memberId)+'/context/'+encodeURIComponent(entryId):'/api/me/context/'+encodeURIComponent(entryId),'GET',undefined,!memberId),null,2));}
  else if(command==='capture'){console.log(JSON.stringify(await call('/api/me/context','POST',await input(values[0]),true),null,2));}
  else if(command==='connection'){if(!values[0])throw new Error('Supply the other member UUID.');console.log(JSON.stringify(await call('/api/connections/'+encodeURIComponent(values[0]),'GET',undefined,true),null,2));}
  else if(command==='potentials'){if(!values[0]||!values[1])throw new Error('Supply the other member UUID and analysis JSON.');console.log(JSON.stringify(await call('/api/connections/'+encodeURIComponent(values[0]),'PUT',await input(values[1]),true),null,2));}
  else if(command==='choose'){if(!values[0]||!values[1])throw new Error('Supply the other member UUID and current possibility ID.');const c=await call('/api/connections/'+encodeURIComponent(values[0]),'GET',undefined,true);console.log(JSON.stringify(await call('/api/proposals','POST',{memberId:values[0],potentialId:values[1],analysisRevision:c.revision,aVersion:c.aVersion,bVersion:c.bVersion,...(c.openDraft?{proposalRevision:c.openDraft.revision}:{})},true),null,2));}
  else if(command==='draft'){if(!values[0])throw new Error('Supply the other member UUID.');console.log(JSON.stringify(await call('/api/proposals','POST',{memberId:values[0],...(values[1]?{body:await input(values[1])}:{})},true),null,2));}
  else if(command==='revise'){if(!values[0]||!values[1]||!Number.isInteger(Number(values[2])))throw new Error('Supply the proposal UUID, plan JSON, and current revision.');console.log(JSON.stringify(await call('/api/proposals/'+encodeURIComponent(values[0]),'PATCH',{body:await input(values[1]),revision:Number(values[2])},true),null,2));}
  else throw new Error('Unknown command. Run help for the supported commands.');
}catch(error){console.error(error.message);process.exitCode=1;}
