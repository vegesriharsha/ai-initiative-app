@echo off
echo AI Initiative Frontend - Service Control
echo =======================================
echo.

:menu
echo Choose an option:
echo 1. Start Service
echo 2. Stop Service  
echo 3. Check Service Status
echo 4. View Service Logs
echo 5. Uninstall Service
echo 6. Exit
echo.
set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto status
if "%choice%"=="4" goto logs
if "%choice%"=="5" goto uninstall
if "%choice%"=="6" goto exit

echo Invalid choice. Please try again.
echo.
goto menu

:start
echo Starting AI Initiative Frontend Service...
node service.js --start
echo.
echo Service start command sent.
echo Check http://localhost:4200 in a few moments.
echo.
pause
goto menu

:stop
echo Stopping AI Initiative Frontend Service...
node service.js --stop
echo.
echo Service stop command sent.
echo.
pause
goto menu

:status
echo Checking service status...
sc query "AI Initiative Frontend" | findstr STATE
echo.
echo Service details:
sc query "AI Initiative Frontend"
echo.
pause
goto menu

:logs
echo Opening service log file...
if exist "service.log" (
    notepad service.log
) else (
    echo No log file found. The service may not have been started yet.
)
echo.
pause
goto menu

:uninstall
echo WARNING: This will uninstall the Windows service.
set /p confirm="Are you sure? (y/N): "
if /i "%confirm%"=="y" (
    echo Uninstalling service...
    node service.js --uninstall
    echo Service uninstallation complete.
) else (
    echo Uninstall cancelled.
)
echo.
pause
goto menu

:exit
echo Goodbye!
pause
exit /b 0
