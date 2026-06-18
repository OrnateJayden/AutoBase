@echo off
echo ========================================
echo   AUTO * BASE - Car Catalog App
echo ========================================
echo.

if not exist node_modules (
    echo Installing dependencies...
    call npm install
    echo.
)

echo Starting development server...
echo Open http://localhost:3000 in your browser
echo.
call npm run dev
