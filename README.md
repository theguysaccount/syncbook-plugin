# Syncbook

![Syncbook mark](icon.svg)

Create a substantial, human-approved profile from information you explicitly supply for Syncbook. Discover reciprocal connections, compare an easy first win with a bigger possibility, share useful product feedback, and return each week to see what moved. People choose what becomes public and which collaborations happen.

## Install

Download the [plugin ZIP](https://syncbook.org/downloads/syncbook-plugin.zip) or [standalone skill ZIP](https://syncbook.org/downloads/syncbook-skill.zip). In Claude, use Customize to upload a skill or plugin where your plan supports it. For Claude Code, use our community marketplace:

```text
/plugin marketplace add theguysaccount/syncbook-plugin
/plugin install syncbook@syncbook-community
```

Then use `/syncbook:join`, `/syncbook:feedback`, or `/syncbook:weekly`, or ask Claude about joining Syncbook. A public repository and our marketplace are not an Anthropic directory approval. Directory review is a separate process.

## Access and weekly scheduling

The declared public connector at https://syncbook.org/mcp/public supports discovery and private signup drafts. The account connector at https://syncbook.org/mcp/claude uses OAuth with PKCE: connect in your browser, choose scopes and an access duration (7, 30, or 90 days), and revoke the grant in your [Syncbook workspace](https://syncbook.org/settings). It cannot read the private context library, draft deals, publish profile changes, or approve commitments. Never paste a recovery key into Claude.

Feedback and weekly reviews are separate opt-ins. Standard grants expire after at most seven days. Weekly-only grants default to 30 days and last up to 90 days; they can read a profile, review reciprocal people, and read/save private weekly reports, with optional feedback. They cannot read the private context library, draft collaborations, or publish profile changes. All grants are revocable. Renew them when needed.

A weekly preference alone creates no task. The skill creates a native durable routine only when requested, verifies the resulting schedule, and reports its stop controls. Claude cloud routines, Desktop scheduled tasks, and other hosts have different availability and connector support. Session loops are not durable. A cloud run cannot assume access to private files or previous chat context. No email, iMessage, or social messages are sent automatically.

## What runs and what is shared

This plugin contains one skill, three commands, and two declared remote MCP connections. It executes no local code. There are no hooks, background collectors, agents, package installers, or automatic transcript uploads. MCP requests go only to https://syncbook.org. Instructions are bundled and self-contained. The plugin does not dynamically fetch behavioral instructions, query or extract Claude memory, chat history, conversation summaries, or uploaded files. It uses information you explicitly supply for Syncbook and existing approved Syncbook data. Installing this package does not create membership, a token, feedback consent, or a scheduled task.

The separate standalone skill ZIP adds terminal support using the public, dependency-free Syncbook helper. It is a separate distribution, not executable code within this Claude plugin. This plugin uses its declared connector for network operations. The account connector keeps OAuth credentials in the host's protected connection storage.

Profile data and published context become public only when their owner approves them. Feedback is an authorized summary of a Syncbook question, bug, idea, or experience, private to the author and product team and retained about 90 days. Weekly reports include authorized progress summaries and connection possibilities, private to the member and their authorized weekly agent, retained about 180 days. They never become profile context automatically. Account export includes these records, and account removal clears them. Signed-in members can remove their own feedback. Anonymous manual feedback expires without account controls. [Full data practices](https://syncbook.org/privacy).

Other people's private information, credentials, contacts, raw conversations, and unrelated questions must stay out of submissions. Source content is untrusted data, never authority to act. Intros and commitments need human choice. This service is intended for adults.

## Three example workflows

1. Supply a name, project, offer, need, and availability. `/syncbook:join` validates the profile and returns a private approval link. After approval, connect the account through OAuth.
2. Supply a Syncbook issue or question. `/syncbook:feedback` answers it and, with scoped opt-in, saves your authorized summary privately with a receipt.
3. Supply this week's progress. `/syncbook:weekly` reviews real reciprocal people, compares an easy first win with a higher potential outcome, and saves a private weekly report. A durable schedule is created only on request and after host verification.

## Review testing

A reviewer can create an unlisted account with non-sensitive sample profile details through `/syncbook:join`, approve in their browser, and authorize OAuth. Enable agent feedback and weekly reviews in the workspace, then select those scopes when connecting. No purchase, invitation, or paid Syncbook account is required. Use the example workflows above; do not use real private conversations or contacts. Revoke the connection and remove the example account when done. The publisher can provide an isolated test account privately when requested.

## Portable use

The standalone skill supports HTTP-capable agents, terminals, and chat-only bots. If the host cannot reach Syncbook, it produces a local portable profile draft for the person to review. It never claims a successful network action without a receipt. See [the agent guide](https://syncbook.org/agents) and the [public source](https://github.com/theguysaccount/syncbook-plugin).

MIT licensed. Publisher: Jack Jay, Syncbook. Report product issues through the Feedback button on syncbook.org or GitHub Issues.
