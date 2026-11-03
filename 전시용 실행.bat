@echo off
rem ------------------------------------------------------------
rem  Dreaming Cradle Wiki - exhibition (kiosk) launcher
rem  Double-click to open the wiki full screen with no browser UI.
rem  To exit: press Alt+F4
rem ------------------------------------------------------------
setlocal
set "SITE=%~dp0index.html"
set "PROFILE=%~dp0.kiosk-profile"

set "BROWSER="
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" set "BROWSER=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not defined BROWSER if exist "%LocalAppData%\Google\Chrome\Application\chrome.exe" set "BROWSER=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if defined BROWSER (
  start "" "%BROWSER%" --kiosk "%SITE%" --user-data-dir="%PROFILE%" --no-first-run --no-default-browser-check --disable-pinch --overscroll-history-navigation=0 --disable-features=Translate --noerrdialogs --disable-session-crashed-bubble --autoplay-policy=no-user-gesture-required
  goto :eof
)

rem Chrome not found: use Microsoft Edge (installed on every Windows 10/11)
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
start "" "%EDGE%" --kiosk "%SITE%" --edge-kiosk-type=fullscreen --user-data-dir="%PROFILE%" --no-first-run --disable-pinch --overscroll-history-navigation=0 --noerrdialogs
