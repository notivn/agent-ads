# Registers the Ads-department schedule (lich.json) in Windows Task Scheduler for the current user.
#   powershell -ExecutionPolicy Bypass -File scripts/register-schedule-windows.ps1 [-Tool claude|codex|antigravity]
#   powershell -ExecutionPolicy Bypass -File scripts/register-schedule-windows.ps1 -Remove
# Tasks run only while the user is logged on (so the user's ADS_MCP_URL and CLI login are available).
param(
  [ValidateSet('claude', 'codex', 'antigravity')][string]$Tool = 'claude',
  [switch]$Remove
)
$ErrorActionPreference = 'Stop'
$dept = Split-Path -Parent $PSScriptRoot
$root = $dept
$prefix = 'PhongAds-'

Get-ScheduledTask -TaskName "$prefix*" -ErrorAction SilentlyContinue | ForEach-Object {
  Unregister-ScheduledTask -TaskName $_.TaskName -Confirm:$false
  Write-Host "Da xoa $($_.TaskName)"
}
if ($Remove) { return }

if ($Tool -eq 'claude' -and -not [Environment]::GetEnvironmentVariable('ADS_MCP_URL', 'User')) {
  Write-Warning 'Chua dat ADS_MCP_URL cho user. Chay: [Environment]::SetEnvironmentVariable("ADS_MCP_URL","https://<domain>/mcp/<key>","User")'
}

$node = (Get-Command node).Source
$script = Join-Path $dept 'scripts\run-schedule.mjs'
$schedule = Get-Content (Join-Path $dept 'lich.json') -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($item in $schedule.lich) {
  $at = [datetime]::ParseExact($item.gio, 'HH:mm', $null)
  if ($item.ngay -eq 'thu-hai') {
    $trigger = New-ScheduledTaskTrigger -Weekly -DaysOfWeek Monday -At $at
  } else {
    $trigger = New-ScheduledTaskTrigger -Daily -At $at
  }
  $action = New-ScheduledTaskAction -Execute $node -Argument "`"$script`" $($item.quy_trinh) --tool $Tool" -WorkingDirectory $root
  $settings = New-ScheduledTaskSettingsSet -StartWhenAvailable -ExecutionTimeLimit (New-TimeSpan -Minutes 40) -MultipleInstances IgnoreNew
  $name = "$prefix$($item.quy_trinh)-$($item.gio.Replace(':', ''))"
  Register-ScheduledTask -TaskName $name -Trigger $trigger -Action $action -Settings $settings -Description "Phong Ads: $($item.quy_trinh) ($Tool)" | Out-Null
  Write-Host "Da dang ky $name luc $($item.gio) ($($item.ngay))"
}
Write-Host 'Gio theo dong ho may tinh - kiem tra may dang de mui gio Viet Nam (UTC+7).'
