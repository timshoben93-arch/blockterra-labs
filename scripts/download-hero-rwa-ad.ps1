# Download a famous RWA tokenization advertisement and rebuild hero assets.
# Run this in a normal PowerShell window (same Windows user as Chrome/Edge).
# YouTube blocks headless downloads; browser cookies are required.

$ErrorActionPreference = "Stop"
$root = Split-Path (Split-Path $PSScriptRoot -Parent) -ErrorAction SilentlyContinue
if (-not $root) { $root = Resolve-Path (Join-Path $PSScriptRoot "..") }
$root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$videos = Join-Path $root "public\videos"
$ff = @(
  "$env:TEMP\ffmpeg-extract\ffmpeg-9.0.2-essentials_build\bin\ffmpeg.exe",
  "$env:TEMP\tbl-rwa-candidates\ffmpeg.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $ff) {
  throw "ffmpeg not found. Install ffmpeg or place ffmpeg.exe on PATH."
}

New-Item -ItemType Directory -Force -Path $videos | Out-Null
$work = Join-Path $env:TEMP "rwa-ad-download"
New-Item -ItemType Directory -Force -Path $work | Out-Null

# Prefer cinematic RWA brand ad (not a how-to explainer)
$candidates = @(
  @{ Id = "86cDFrZVAe4"; Title = "The Greatest Wealth Transfer (RWA Story House)" },
  @{ Id = "r181BsxDfv4"; Title = "Built on Hedera | RedSwan" },
  @{ Id = "AGmcL1iWmXs"; Title = "MANTRA - The Layer 1 for RWA Tokenization" }
)

$browser = if (Test-Path "$env:LOCALAPPDATA\Google\Chrome\User Data") { "chrome" } else { "edge" }
$chosen = $null

foreach ($c in $candidates) {
  Write-Host "Trying $($c.Title) ..."
  $url = "https://www.youtube.com/watch?v=$($c.Id)"
  $outTpl = Join-Path $work "$($c.Id).%(ext)s"
  try {
    python -m yt_dlp --cookies-from-browser $browser --js-runtimes node `
      -f "bv*[height<=720]+ba/b[height<=720]/b" --merge-output-format mp4 `
      -o $outTpl $url
    $mp4 = Get-ChildItem $work -Filter "$($c.Id).mp4" | Select-Object -First 1
    if ($mp4) {
      $probe = & $ff -i $mp4.FullName 2>&1 | Out-String
      if ($probe -match "Duration:\s*(\d+):(\d+):(\d+\.\d+)") {
        $dur = [int]$Matches[1] * 3600 + [int]$Matches[2] * 60 + [double]$Matches[3]
        Write-Host ("  duration={0:n1}s" -f $dur)
        # Prefer ~3-4 minutes; otherwise keep first successful download
        if ($dur -ge 150 -and $dur -le 270) {
          $chosen = $mp4
          break
        }
        if (-not $chosen) { $chosen = $mp4 }
      } else {
        if (-not $chosen) { $chosen = $mp4 }
      }
    }
  } catch {
    Write-Host "  failed: $($_.Exception.Message)"
  }
}

if (-not $chosen) {
  throw "Could not download any candidate. Open YouTube once in Chrome, then re-run this script."
}

Write-Host "Using $($chosen.Name)"
$src = Join-Path $work "hero-source.mp4"
Copy-Item $chosen.FullName $src -Force

& $ff -y -i $src -t 240 -vf "scale=1920:-2" -c:v libx264 -preset medium -crf 23 -an `
  (Join-Path $videos "hero-background.mp4")
& $ff -y -i $src -t 240 -vf "scale=960:-2" -c:v libx264 -preset medium -crf 26 -an `
  (Join-Path $videos "hero-background-mobile.mp4")
& $ff -y -ss 8 -i $src -frames:v 1 -update 1 `
  (Join-Path $videos "hero-poster.jpg")

Write-Host "Done. Hero assets written to $videos"
Write-Host "Rebuild preview: npm run build; npm run preview -- --host 127.0.0.1 --port 4173"
