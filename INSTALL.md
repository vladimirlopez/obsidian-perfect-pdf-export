# Installation Guide

## Quick Install (For Users)

### Method 1: Manual Installation

1. **Download the latest release:**
   - Go to the [Releases page](https://github.com/vladimirlopez/obsidian-perfect-pdf-export/releases)
   - Download the latest `perfect-pdf-export-vX.X.X.zip`

2. **Extract to your vault:**
   ```
   YourVault/
   └── .obsidian/
       └── plugins/
           └── perfect-pdf-export/
               ├── main.js
               ├── manifest.json
               └── styles.css
   ```

3. **Enable the plugin:**
   - Open Obsidian
   - Go to Settings → Community Plugins
   - Turn off "Safe mode" (if enabled)
   - Click "Reload plugins"
   - Find "Perfect PDF Export" and toggle it ON

4. **Verify installation:**
   - Look for the PDF icon in the left ribbon
   - Open Settings → Perfect PDF Export to configure

### Method 2: Community Plugins (Future)

*This plugin will be available in the Community Plugins browser after approval.*

1. Open Obsidian
2. Go to Settings → Community Plugins
3. Click "Browse"
4. Search for "Perfect PDF Export"
5. Click "Install"
6. Enable the plugin

## Development Installation

### For Plugin Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vladimirlopez/obsidian-perfect-pdf-export.git
   cd obsidian-perfect-pdf-export
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the plugin:**
   ```bash
   npm run build
   ```

4. **Link to your test vault:**
   ```bash
   # Option A: Symlink (recommended)
   ln -s "$(pwd)" "/path/to/your/vault/.obsidian/plugins/perfect-pdf-export"
   
   # Option B: Copy files manually
   cp main.js manifest.json styles.css "/path/to/your/vault/.obsidian/plugins/perfect-pdf-export/"
   ```

5. **Enable in Obsidian:**
   - Reload Obsidian or press Cmd/Ctrl+R
   - Enable the plugin in Community Plugins

### Development Workflow

1. **Start watch mode:**
   ```bash
   npm run dev
   ```
   This will automatically rebuild when you make changes.

2. **After changes:**
   - Reload Obsidian (Cmd/Ctrl+R)
   - Test your changes

3. **Before committing:**
   ```bash
   npm run build
   ```
   Verify it builds without errors.

## File Structure

After installation, your plugin folder should contain:

```
perfect-pdf-export/
├── main.js          # Compiled plugin code
├── manifest.json    # Plugin metadata
└── styles.css       # Plugin styles
```

## Troubleshooting

### Plugin not showing up

**Problem:** Plugin doesn't appear in settings or ribbon

**Solutions:**
1. Check file locations are correct
2. Verify manifest.json is valid JSON
3. Ensure all three files (main.js, manifest.json, styles.css) are present
4. Reload Obsidian completely
5. Check if Community Plugins are enabled

### Build errors

**Problem:** `npm run build` fails

**Solutions:**
1. Delete `node_modules` and run `npm install` again
2. Check Node.js version (need 16+)
3. Verify all source files are present
4. Check for TypeScript errors

### Permission errors

**Problem:** Can't copy files or create symlinks

**Solutions:**
1. Run terminal as administrator (Windows)
2. Check folder permissions
3. Use copy method instead of symlink
4. Manually create the plugin folder first

### Plugin loads but doesn't work

**Problem:** Plugin is enabled but features don't work

**Solutions:**
1. Check browser console (F12) for errors
2. Verify settings are accessible
3. Try disabling other plugins
4. Check Obsidian version compatibility (need 0.15.0+)

## System Requirements

- **Obsidian:** Version 0.15.0 or higher
- **OS:** Windows, macOS, or Linux
- **For Development:**
  - Node.js 16 or higher
  - npm
  - Git

## Uninstallation

To remove the plugin:

1. Go to Settings → Community Plugins
2. Find "Perfect PDF Export"
3. Toggle it OFF
4. Optionally, delete the plugin folder:
   ```
   .obsidian/plugins/perfect-pdf-export/
   ```

## Updating

### Manual Update

1. Download the latest release
2. Replace the files in your plugin folder
3. Reload Obsidian

### From Community Plugins (Future)

1. Go to Settings → Community Plugins
2. Click "Check for updates"
3. Update if available

## Getting Help

- **Documentation:** See [README.md](README.md)
- **Testing:** See [TESTING.md](TESTING.md)
- **Issues:** [GitHub Issues](https://github.com/vladimirlopez/obsidian-perfect-pdf-export/issues)
- **Discussions:** [GitHub Discussions](https://github.com/vladimirlopez/obsidian-perfect-pdf-export/discussions)

---

**Ready to use Perfect PDF Export!** 📄✨
