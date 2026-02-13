#!/bin/bash
cd ~/MagicMirror

# 1. Force the Display (Try wayland-1 first, common for Pi 5)
export WAYLAND_DISPLAY=wayland-1

# 2. Launch Electron Directly (Bypasses the "Node: bad option" error)
./node_modules/.bin/electron js/electron.js --enable-features=UseOzonePlatform --ozone-platform=wayland
