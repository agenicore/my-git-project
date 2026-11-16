# Coding with AJ — local activation

The approved Phase 0 HTML is unchanged in `index.html`. The working application source is in `app/`, with the original stylesheet and instructor photograph. Opening index.html still opens the old prototype. Use the Next.js server for the new functions.

## Enter the key privately

Open `.env.local` in Notepad on your laptop. Add your API key after `OPENAI_API_KEY=` and save. Do not paste it in chat or include it in recordings. The key is only read by server routes, never included in browser JavaScript. API usage uses your API account billing.

## Start on Windows

Open PowerShell and run:

```powershell
Set-Location 'C:\Users\ajale\Projects\coding-with-aj\coding-with-aj-updated'
powershell -NoProfile -ExecutionPolicy Bypass -File .\START-LOCAL.ps1
```

This process-scoped execution policy does not change Windows policy permanently. The script downloads project dependencies, checks TypeScript, and starts Next.js on `http://127.0.0.1:3001`. It reuses an installed or app-bundled Node and package manager; it does not install global software or change WSL, Docker, Git, or VS Code. Keep PowerShell open. Stop with Ctrl+C. Restart after editing the key.

If Node and npm are installed normally, equivalent commands are:

```powershell
npm install --ignore-scripts
npm run typecheck
npm run dev -- --port 3001
```

## Verification checklist

- Open port 3001; check the original dark layout, avatar and mobile drawers.
- Navigate all 14 lessons, all four lesson sub-tabs, and Previous/Next boundaries.
- Mark a lesson complete, write notes and edit a workspace; refresh to verify persistence.
- Search lessons and clear the search.
- Add and complete a project; visit Practice, Resources, Settings and Help.
- Export a backup, change data, then import it and confirm restoration. Invalid imports must leave current data intact.
- Open AI Actions, propose a command, reject it; propose another and record approval. Copy the approved task. Neither action runs a command.
- Ask AJ a lesson question and a follow-up. Switch lessons to confirm separate histories.
- Verify missing/invalid API keys produce useful errors and the browser never receives the key.
- Review pasted terminal output with AJ. Completion remains student-attested.
- Repeat navigation at a phone viewport.

## Current limits and validation status

This is a single-device local learning app. It has no account system, cloud database or autonomous command runner. Local browser data is separate for file URLs, localhost, 127.0.0.1, ports, and different browsers; use one consistent server URL. Old progress can migrate only if it is accessible on the same origin. Video is a preserved visual placeholder until actual video files are supplied.

The API uses OpenAI Responses with server-side credentials, bounded conversation history, timeouts, basic rate limiting and same-origin POST checks. Chat is sent to OpenAI only when the student submits a question. The server binds to loopback; authentication and durable rate limiting are required before any shared deployment.

Dependency download was blocked by DNS/network restrictions in the agent execution session. Build, type checks, browser interaction tests and a live API call have NOT yet passed. Run the startup script in normal PowerShell to complete those checks; report any errors without sharing secrets.

Checks completed: PowerShell startup script parses; isolated server-route tests passed for missing key, foreign origin, invalid lesson, invalid messages, and a mocked OpenAI response. These do not replace the pending Next.js typecheck, build, browser tests, or live API test.
