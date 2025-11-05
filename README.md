# GitHub Actions Green Checkboxes

A Chrome extension that changes grey checkboxes to green in GitHub Actions detail pages, matching the green color from successful steps in the left sidebar.

## Features

- Changes grey checkboxes/icons to green in the right-hand detail panel of GitHub Actions pages
- Automatically handles dynamically loaded content
- Works with GitHub's single-page application navigation
- Non-intrusive - only modifies visual appearance, doesn't affect functionality

## Installation

### From Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the directory containing this extension
6. The extension should now be active

## Usage

Once installed, the extension will automatically:
- Activate on GitHub Actions pages (URLs matching `*://github.com/*/actions/runs/*` or `*://github.com/*/actions/jobs/*`)
- Change grey checkboxes to green in the detail panel
- Update dynamically as content loads

No configuration needed - it works automatically!

## Example

Visit a GitHub Actions run page like:
`https://github.com/sdras/awesome-actions/actions/runs/18790524996/job/53619416416`

The grey checkboxes in the right-hand detail panel (e.g., next to "Set up job") will now appear green, matching the successful status indicators in the left sidebar.

## Technical Details

- **Manifest Version**: 3
- **Content Scripts**: CSS and JavaScript injection
- **Target Pages**: GitHub Actions run and job detail pages
- **Color**: Uses GitHub's success green color (`#1a7f37`)

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `content.css` - CSS styles for checkbox color overrides
- `content.js` - JavaScript for handling dynamic content
- `README.md` - This file

## License

MIT

