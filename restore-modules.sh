#!/bin/bash
# Restore all MagicMirror modules and dependencies

MM_DIR="/home/pi5/MagicMirror"
MODULES_DIR="$MM_DIR/modules"

echo "╔════════════════════════════════════════════════╗"
echo "║  MagicMirror Module Restoration Script        ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Step 1: Install main MagicMirror dependencies
echo "📦 Installing main MagicMirror dependencies..."
cd "$MM_DIR"
npm install --only=prod --omit=dev

if [ $? -ne 0 ]; then
    echo "❌ Failed to install main dependencies"
    exit 1
fi

echo "✅ Main dependencies installed"
echo ""

# Step 2: Install module dependencies
echo "📦 Installing module dependencies..."

module_count=0
for module_dir in "$MODULES_DIR"/*; do
    if [ -d "$module_dir" ] && [ "$(basename "$module_dir")" != "default" ]; then
        module_name=$(basename "$module_dir")
        
        if [ -f "$module_dir/package.json" ]; then
            echo "  → Installing $module_name..."
            cd "$module_dir"
            npm install --only=prod
            
            if [ $? -eq 0 ]; then
                echo "    ✅ $module_name"
                ((module_count++))
            else
                echo "    ⚠️  $module_name (failed, but continuing...)"
            fi
        fi
    fi
done

echo ""
echo "✅ Installed dependencies for $module_count modules"
echo ""

# Step 3: Verify critical files exist
echo "🔍 Verifying installation..."

critical_files=(
    "$MM_DIR/config/config.js"
    "$MM_DIR/css/custom.css"
)

missing_files=0
for file in "${critical_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "  ⚠️  Missing: $file"
        ((missing_files++))
    fi
done

if [ $missing_files -eq 0 ]; then
    echo "  ✅ All critical files present"
else
    echo "  ⚠️  $missing_files critical file(s) missing"
fi

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║  Restoration Complete!                         ║"
echo "╚════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1. Restore your photos to /home/pi5/Pictures/Magic Mirror Pics/"
echo "2. Run: npm start"
