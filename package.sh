#!/bin/bash

# Packaging script for GitHub Actions Green Checkboxes Chrome Extension
# Creates a zip file ready for Chrome Web Store upload

set -e  # Exit on error

# Get the version from manifest.json
VERSION=$(grep -o '"version": "[^"]*"' manifest.json | cut -d'"' -f4)
EXTENSION_NAME="github-actions-green-checkboxes"
ZIP_NAME="${EXTENSION_NAME}-v${VERSION}.zip"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Packaging GitHub Actions Green Checkboxes extension...${NC}"

# Remove old zip if it exists
if [ -f "$ZIP_NAME" ]; then
    echo "Removing old package: $ZIP_NAME"
    rm "$ZIP_NAME"
fi

# Create the zip file with only the necessary files
zip -r "$ZIP_NAME" \
    manifest.json \
    content.js \
    content.css \
    icon-16.png \
    icon-48.png \
    icon-128.png \
    -x "*.DS_Store" "*.git/*" "*.sh" "README.md" "*.zip" "*.svg" "package.js"

echo -e "${GREEN}✓ Package created: ${ZIP_NAME}${NC}"
echo -e "${BLUE}Ready for Chrome Web Store upload!${NC}"

