#requires -Version 5.1
<#
.SYNOPSIS
  Print an ActivityWatch day report as: [HH:MM-HH:MM] | app: title
  Idle breaks appear as: [HH:MM-HH:MM] | idle
#>
[CmdletBinding()]
param(
  [string]$Date = (Get-Date -Format 'yyyy-MM-dd'),
  [int]$MinDurationSec = 60,      # drop active blocks shorter than this (noise)
  [int]$MergeGapMin = 5,          # bridge same app+title blocks separated by < this many minutes
  [int]$IdleThresholdMin = 5,     # only show idle gaps longer than this (ignored when -ShowIdle is off)
  [switch]$ShowIdle,              # include idle blocks in output (default: off)
  [string]$Server = 'http://localhost:5600'
)
$ErrorActionPreference = 'Stop'

# 1. Discover buckets (IDs carry the hostname, so never hardcode them)
$buckets = Invoke-RestMethod "$Server/api/0/buckets/"
$win = $buckets.PSObject.Properties.Where({ $_.Value.type -eq 'currentwindow' })[0]
if (-not $win) { throw 'No window bucket found - is ActivityWatch running?' }
$afk = $buckets.PSObject.Properties.Where({ $_.Value.type -eq 'afkstatus' })[0]
if ($ShowIdle -and -not $afk) { throw 'No afk bucket found - required when -ShowIdle is on.' }

# 2. Local day window, e.g. 2026-06-27T00:00:00+05:30 / next midnight
$start = [datetime]::ParseExact($Date, 'yyyy-MM-dd', $null)
$fmt = 'yyyy-MM-ddTHH:mm:sszzz'
$period = '{0}/{1}' -f $start.ToString($fmt), $start.AddDays(1).ToString($fmt)

# 3. Query: when -ShowIdle is off, skip the afk bucket entirely and return all window events.
#    When -ShowIdle is on, intersect with not-afk and also return idle periods.
if ($ShowIdle) {
  $q = @(
    "afk = query_bucket(""$($afk.Name)"");",
    "win = query_bucket(""$($win.Name)"");",
    "active = sort_by_timestamp(filter_period_intersect(win, filter_keyvals(afk, ""status"", [""not-afk""])));",
    "RETURN = {""active"": active, ""idle"": sort_by_timestamp(filter_keyvals(afk, ""status"", [""afk""]))};"
  )
} else {
  $q = @(
    "win = query_bucket(""$($win.Name)"");",
    "RETURN = {""active"": sort_by_timestamp(win), ""idle"": []};"
  )
}
$body = @{ timeperiods = @($period); query = $q } | ConvertTo-Json -Depth 5
$res = (Invoke-RestMethod "$Server/api/0/query/" -Method Post -Body $body -ContentType 'application/json')[0]

# 4. Collapse adjacent same app+title events into blocks
$blocks = [System.Collections.Generic.List[object]]::new()
$cur = $null
foreach ($e in $res.active) {
  $s = ([datetime]$e.timestamp).ToLocalTime()
  $en = $s.AddSeconds($e.duration)
  if ($cur -and $cur.app -eq $e.data.app -and $cur.title -eq $e.data.title -and ($s - $cur.end).TotalSeconds -le 1) {
    $cur.end = $en
  } else {
    if ($cur) { $blocks.Add($cur) }
    $cur = [pscustomobject]@{ start = $s; end = $en; app = $e.data.app; title = $e.data.title }
  }
}
if ($cur) { $blocks.Add($cur) }

# 5. Drop sub-threshold slivers, then bridge same app+title blocks across small gaps
#    (dropping first lets a dominant activity coalesce instead of flip-flopping)
$lines = [System.Collections.Generic.List[object]]::new()
foreach ($b in ($blocks | Where-Object { ($_.end - $_.start).TotalSeconds -ge $MinDurationSec })) {
  $last = if ($lines.Count) { $lines[$lines.Count - 1] } else { $null }
  if ($last -and -not $last.idle -and $last.app -eq $b.app -and $last.title -eq $b.title -and ($b.start - $last.end).TotalMinutes -le $MergeGapMin) {
    $last.end = $b.end
  } else {
    $lines.Add([pscustomobject]@{ start = $b.start; end = $b.end; app = $b.app; title = $b.title; idle = $false })
  }
}

# 6. Idle blocks over threshold, with overlapping intervals merged into one
$idle = [System.Collections.Generic.List[object]]::new()
foreach ($e in ($res.idle | Sort-Object { $_.timestamp })) {
  if ($e.duration -lt $IdleThresholdMin * 60) { continue }
  $s = ([datetime]$e.timestamp).ToLocalTime(); $en = $s.AddSeconds($e.duration)
  $last = if ($idle.Count) { $idle[$idle.Count - 1] } else { $null }
  if ($last -and $s -le $last.end) { if ($en -gt $last.end) { $last.end = $en } }
  else { $idle.Add([pscustomobject]@{ start = $s; end = $en; app = $null; title = $null; idle = $true }) }
}
if ($ShowIdle) { $idle | ForEach-Object { $lines.Add($_) } }

# 7. Sort by time and print
"# Activity report - $Date ($($win.Value.hostname))"
''
$lines | Sort-Object start | ForEach-Object {
  $t = '[{0:HH:mm}-{1:HH:mm}]' -f $_.start, $_.end
  if ($_.idle) { "$t | idle" }
  elseif ($_.title) { "$t | $($_.app): $($_.title)" }
  else { "$t | $($_.app)" }
}
