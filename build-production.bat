@echo off
echo Building AI Initiative App for Production...
echo.

echo [1/3] Building frontend application...
cd frontend
call npm run build
if %errorlevel% neq 0 (
    echo Error building frontend!
    pause
    exit /b 1
)
cd ..

echo [2/3] Preparing backend public directory...
if exist "backend\public" (
    rmdir /s /q "backend\public"
)

echo [3/3] Copying frontend build to backend...
xcopy /E /I "frontend\dist\ai-initiative-frontend" "backend\public"
if %errorlevel% neq 0 (
    echo Error copying frontend files!
    pause
    exit /b 1
)

echo.
echo ====================================
echo Production Build Complete!
echo ====================================
echo.
echo To start the production server:
echo   cd backend ^&^& npm start
echo.
echo Then access the application at:
echo   http://localhost:3000
echo.
echo The application will serve both frontend and backend
echo from a single server with data persistence to JSON file.
echo.
pause
