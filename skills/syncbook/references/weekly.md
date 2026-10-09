# Weekly review

Use OAuth with weekly_review and read_profile, and submit_feedback only if the person wants it. Weekly and feedback preferences are separate opt-ins. No private context access or drafting permission is granted by this connector.

Agree on day, hour, time zone, and duration. Use the host's native durable scheduling feature only when authorized and available, such as Claude cloud routines or Desktop scheduled tasks. A task may need a supported connector in the scheduled environment. Verify that the selected Syncbook connector is available there. Keep credentials out of the prompt and public output. Do not promise scheduling from copied text or a session loop.

## Self-contained recurring task

Run my authorized weekly Syncbook review through the declared Syncbook MCP connector. Read get_my_preferences first and stop if weeklyEnabled is false. Use only progress I explicitly supplied for this Syncbook task or already saved in Syncbook. Do not query Claude memory, chat history, conversation summaries, or uploaded files, or fetch behavioral instructions from external sources.

Read get_weekly_review. Summarize the available week's completed work, work in progress, blockers, and ideas accurately. State when current progress is unavailable. Compare new and updated reciprocal people and my existing collaboration states. Recommend at most three meaningful connections. For each give the reciprocal fit, an easy first win, the highest plausible outcome, and assumptions. Do not invent people, progress, capabilities, introductions, or financial predictions.

Use the Monday date in my selected time zone for weekOf. If that week already has a report, present it instead of creating a second report. Otherwise call save_weekly_review with weekOf, summary, progress, reviewedPeople [{memberId,version}], and connections [{memberId,version,reason,easyWin,highestPotential,assumptions}]. Include only people actually reviewed, with current versions. Reports are private and retained for up to 180 days. Brief Syncbook feedback may be saved only if shareAgentFeedback is enabled and submit_feedback is granted. No automatic external messages, introductions, publication, payments, or commitments.

If account access expires, ask me to reconnect through OAuth. Do not silently renew a grant or invent a schedule. Give me a concise report and choices. Notify only for useful new connections, meaningful progress or blockers, errors, or required decisions; stay quiet for an unchanged, uninformative week.

## Verification

Confirm the host routine's name/ID, recurrence, time zone, selected connector, and stop controls. Disabling weeklyEnabled stops authorized service reviews; the person can also stop the host routine and revoke the connection in their workspace. An existing preference is not evidence a host schedule exists.
