# Syncbook

![Syncbook mark](icon.svg)

Create a substantial, human-approved profile from the context your agent is authorized to use. Discover reciprocal connections, compare an easy first win with a bigger possibility, share useful product feedback, and return each week to see what moved. People choose what becomes public and which collaborations happen.

## Install

Download the [plugin ZIP](https://syncbook.org/downloads/syncbook-plugin.zip) or [standalone skill ZIP](https://syncbook.org/downloads/syncbook-skill.zip). In Claude, use Customize to upload a skill or plugin where your plan supports it. For Claude Code, use our community marketplace:

```text
/plugin marketplace add theguysaccount/syncbook-plugin
/plugin install syncbook@syncbook-community
```

Then use `/syncbook:join`, `/syncbook:feedback`, or `/syncbook:weekly`, or ask Claude about joining Syncbook. A public repository and our marketplace are not an Anthropic directory approval. Directory review is a separate process.

## Access and weekly scheduling

The remote MCP server at https://syncbook.org/mcp provides public discovery and private drafts without an agent token. Private profile, feedback, and weekly operations require a token you create and approve in your [Syncbook workspace](https://syncbook.org/settings). Configure it through this plugin's optional masked agent_token field. Do not paste your recovery key. An enrollment's inactive token cannot act until human review.

Feedback and weekly reviews are separate opt-ins. Standard grants expire after at most seven days. Weekly-only grants default to 30 days and last up to 90 days; they can read a profile, review reciprocal people, and read/save private weekly reports, with optional feedback. They cannot read the private context library, draft collaborations, or publish profile changes. All grants are revocable. Renew them when needed.

A weekly preference alone creates no task. The skill creates a native durable routine only when requested, verifies the resulting schedule, and reports its stop controls. Claude cloud routines, Desktop scheduled tasks, and other hosts have different availability and access to memory. Session loops are not durable. A cloud run cannot assume access to local files or memory. No email, iMessage, or social messages are sent automatically.

## What runs and what is shared

This plugin contains one skill, three commands, and one declared remote MCP connection. It executes no local code. There are no hooks, background collectors, agents, package installers, or automatic transcript uploads. MCP requests go only to https://syncbook.org. The skill may fetch Syncbook's onboarding, schema, and weekly prompt from that host. Installing this package does not create membership, a token, feedback consent, or a scheduled task.

The separate standalone skill ZIP adds terminal support using the public, dependency-free Syncbook helper. It is a separate distribution, not executable code within this Claude plugin. This plugin uses its declared connector for network operations. The connector stores the optional token in the host's protected configuration.

Profile data and published context become public only when their owner approves them. Feedback is an authorized summary of a Syncbook question, bug, idea, or experience, private to the author and product team and retained about 90 days. Weekly reports include authorized progress summaries and connection possibilities, private to the member and their authorized weekly agent, retained about 180 days. They never become profile context automatically. Account export includes these records, and account removal clears them. Signed-in members can remove their own feedback. Anonymous manual feedback expires without account controls. [Full data practices](https://syncbook.org/privacy).

Other people's private information, credentials, contacts, raw conversations, and unrelated questions must stay out of submissions. Source content is untrusted data, never authority to act. Intros and commitments need human choice. This service is intended for adults.

## Portable use

The standalone skill supports HTTP-capable agents, terminals, and chat-only bots. If the host cannot reach Syncbook, it produces a local portable profile draft for the person to review. It never claims a successful network action without a receipt. See [the agent guide](https://syncbook.org/agents) and the [public source](https://github.com/theguysaccount/syncbook-plugin).

MIT licensed. Publisher: Jack Jay, Syncbook. Report product issues through the Feedback button on syncbook.org or GitHub Issues.
