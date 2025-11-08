#!/usr/bin/env node

/**
 * Packaging script for GitHub Actions Green Checkboxes Chrome Extension
 * Creates a zip file ready for Chrome Web Store upload
 * 
 * Usage: node package.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get the version from manifest.json
const manifest = JSON.parse(fs.readFileSync('manifest.json', 'utf8'));
const version = manifest.version;
const extensionName = 'github-actions-green-checkboxes';
const zipName = `${extensionName}-v${version}.zip`;

console.log('\x1b[34m%s\x1b[0m', 'Packaging GitHub Actions Green Checkboxes extension...');

// Remove old zip if it exists
if (fs.existsSync(zipName)) {
  console.log(`Removing old package: ${zipName}`);
  fs.unlinkSync(zipName);
}

// Files to include in the package
const filesToInclude = [
  'manifest.json',
  'content.js',
  'content.css',
  'icon-16.png',
  'icon-48.png',
  'icon-128.png'
];

// Check that all required files exist
const missingFiles = filesToInclude.filter(file => !fs.existsSync(file));
if (missingFiles.length > 0) {
  console.error('\x1b[31m%s\x1b[0m', `Error: Missing required files: ${missingFiles.join(', ')}`);
  process.exit(1);
}

// Use zip command if available (Unix/macOS)
// Otherwise, you could use a Node.js zip library like 'archiver'
try {
  const filesList = filesToInclude.join(' ');
  execSync(`zip -r "${zipName}" ${filesList} -x "*.DS_Store" "*.git/*" "*.sh" "README.md" "*.zip" "*.svg" "package.js"`, {
    stdio: 'inherit',
    cwd: __dirname
  });
  
  console.log('\x1b[32m%s\x1b[0m', `✓ Package created: ${zipName}`);
  console.log('\x1b[34m%s\x1b[0m', 'Ready for Chrome Web Store upload!');
} catch (error) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: zip command not found. Please install zip utility or use package.sh');
  console.error('Alternatively, you can install a Node.js zip library: npm install archiver');
  process.exit(1);
}

