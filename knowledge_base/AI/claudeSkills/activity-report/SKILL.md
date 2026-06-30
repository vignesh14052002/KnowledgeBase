---
name: activity-report
description: Generate a day's time-log report from the local ActivityWatch API (localhost:5600), formatted as [HH:MM-HH:MM] | app: title with idle gaps. Use when the user wants to summarize, export, or extract their tracked work time for a given date.
---

# Activity Report

Pulls one day of events from the local ActivityWatch API and prints a compact timeline meant to be fed to an AI time-log extractor.

## Run it

```powershell
.\Get-ActivityReport.ps1                    # today
.\Get-ActivityReport.ps1 -Date 2026-06-25   # a specific day
```

Optional params: `-MinDurationSec 30` (drop active blocks shorter than this), `-IdleThresholdMin 5` (only show idle gaps longer than this), `-Server http://localhost:5600`.

## Output

```
# Activity report - 2026-06-27 (HOST)

[09:02-09:48] | Code: main.py
[09:48-10:05] | chrome: ActivityWatch docs
[11:30-12:15] | idle
[12:15-12:40] | olk.exe: Inbox
```

Adjacent events with the same app+title are merged; idle appears as its own line only when longer than the threshold. Window titles are kept on purpose so you can read context (tabs, files) and consolidate frequent switches itself.

## Environment note

This script is **Windows PowerShell** (zero install on Windows). If the user is on **macOS/Linux**, port the same logic to bash + curl before running. The API contract:

1. `GET /api/0/buckets/` -> pick buckets of type `currentwindow` and `afkstatus` (IDs carry the hostname, never hardcode).
2. `POST /api/0/query/` with `timeperiods: ["<localStart>/<localEnd>"]` and a query that intersects window events with `not-afk` and returns afk periods separately.
3. Merge adjacent same app+title events, drop sub-threshold slivers, show idle over the threshold, format as above.

Requires ActivityWatch running (default `http://localhost:5600`).

## Summary Example
| Time Block | Duration | Entry |
|------------|----------|-------|
| 09:02-09:47 | 45m | Research on Knowledge Graphs |
| 10:00-10:30 | 30m | Chatbot Developers Syncup |

### Summary Instructions
- always give in a table format with 3 columns: Time Block, Duration, Entry
- Dont give too granular logs, merge similar activities. try not to give entry less than 5 mins
- User may context switch between apps, figure out the main activity and summarize it. For example if the user is researching on a topic, he may switch between browser (to explore), code editor (to prototype), teams (to discuss), and note-taking app (to jot down ideas). The summary should reflect the main activity rather than listing every app switch.

