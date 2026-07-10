@echo off
chcp 65001 >nul
title 导航链接管理器 - 本地服务器

echo ========================================
echo   🚀 导航链接管理器 - 启动脚本
echo ========================================
echo.

cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] 检测到 Node.js，使用 server.js 启动...
    echo.
    node server.js
    goto :exit
)

where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] 检测到 Python，使用 server.py 启动...
    echo.
    python server.py
    goto :exit
)

where py >nul 2>nul
if %errorlevel% equ 0 (
    echo [INFO] 检测到 Python，使用 server.py 启动...
    echo.
    py server.py
    goto :exit
)

echo.
echo ❌ 未检测到 Node.js 或 Python
echo.
echo 请安装以下任一环境：
echo   1. Node.js: https://nodejs.org/
echo   2. Python: https://www.python.org/
echo.
pause

:exit