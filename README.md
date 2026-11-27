# GitHub Actions Green Checkboxes

A Chrome and Firefox extension that changes grey checkboxes to green in GitHub Actions detail pages, matching the green color from successful steps in the left sidebar.

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

## Firefox

Firefox 140 or later is necessary. Firefox uses the same code as Chrome, with a different manifest. Load the Firefox build, not the repository root.

1. Run `./package.sh firefox`. This writes the Firefox build to `build/firefox/`. The script needs `jq` and `zip`.
2. Open `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on** and select `build/firefox/manifest.json`.

Firefox removes a temporary add-on when it closes. To keep the add-on installed, sign it on addons.mozilla.org (AMO) as unlisted:

```bash
npx web-ext sign --channel=unlisted --source-dir build/firefox --artifacts-dir build/signed
```

The command reads your AMO API keys from the `WEB_EXT_API_KEY` and `WEB_EXT_API_SECRET` environment variables. Create the keys at https://addons.mozilla.org/en-US/developers/addon/api/key/.

`./package.sh` with no argument makes `github-actions-green-checkboxes-chrome-vX.Y.Z.zip` and `github-actions-green-checkboxes-firefox-vX.Y.Z.zip`. The Firefox manifest is `manifest.json` merged with `firefox/manifest.overrides.json`.

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

