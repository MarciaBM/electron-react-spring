#!/bin/bash

# Function to check if a port is in use
function wait_for_port() {
    local port=$1
    echo "⏳ Waiting for port $port to be available..."
    while ! nc -z localhost $port; do
        sleep 2
    done
    echo "✅ Port $port is now available!"
}

echo "🚀 Starting the project..."

# 1️⃣ Start the Backend (Maven)
echo "🟡 Starting Backend (Maven)..."
cd spring || { echo "❌ Backend folder not found!"; exit 1; }
mvn spring-boot:run &> backend.log &
BACKEND_PID=$!
cd ..
wait_for_port 8080

# 2️⃣ Start the Frontend (React + Vite)
echo "🟡 Starting Frontend (React)..."
cd react || { echo "❌ React folder not found!"; exit 1; }
npm run dev &> frontend.log &
FRONTEND_PID=$!
cd ..
wait_for_port 9000

# 3️⃣ Start Electron App
echo "🟡 Starting Electron App..."
npm run start &> electron.log &
ELECTRON_PID=$!

echo "🎉 All services started successfully!"
echo "🛑 To stop everything, use: kill $BACKEND_PID $FRONTEND_PID $ELECTRON_PID"

# Keep script running to monitor logs (optional)
tail -f spring/backend.log react/frontend.log electron.log
