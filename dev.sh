#!/bin/bash

# Development script for WSL
export FORCE_COLOR=1
export BROWSER=none

echo "🎮 Starting Pixel Art Portfolio Development Server..."
echo "📁 Working Directory: $(pwd)"
echo "🌐 Server will be available at: http://localhost:3000"
echo ""

npm run dev
