#!/bin/bash
# Auto-generate list of installed modules

MODULES_DIR="/home/pi5/MagicMirror/modules"
OUTPUT_FILE="/home/pi5/MagicMirror/INSTALLED_MODULES.txt"

echo "# MagicMirror Installed Modules" > "$OUTPUT_FILE"
echo "# Generated on: $(date)" >> "$OUTPUT_FILE"
echo "# This file is auto-generated - DO NOT EDIT MANUALLY" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "=== CUSTOM MODULES ===" >> "$OUTPUT_FILE"
for dir in "$MODULES_DIR"/*/; do
    module_name=$(basename "$dir")
    
    # Skip default MagicMirror modules
    if [[ "$module_name" != "default" ]] && [[ "$module_name" != "node_modules" ]]; then
        echo "$module_name" >> "$OUTPUT_FILE"
        
        # Check if it has a package.json (indicates npm dependencies)
        if [ -f "$dir/package.json" ]; then
            echo "  → Has package.json (needs npm install)" >> "$OUTPUT_FILE"
        fi
    fi
done

echo "" >> "$OUTPUT_FILE"
echo "=== DEFAULT MODULES ===" >> "$OUTPUT_FILE"
if [ -d "$MODULES_DIR/default" ]; then
    for dir in "$MODULES_DIR/default"/*/; do
        echo "$(basename "$dir")" >> "$OUTPUT_FILE"
    done
fi

echo "" >> "$OUTPUT_FILE"
echo "Total custom modules: $(find "$MODULES_DIR" -maxdepth 1 -type d ! -name default ! -name node_modules ! -name modules | wc -l)" >> "$OUTPUT_FILE"

chmod +x "$OUTPUT_FILE"
echo "Module list created: $OUTPUT_FILE"
