# Testing Guide for Perfect PDF Export

This guide helps you test and verify all features of the Perfect PDF Export plugin.

## Setup

### Installation

1. **Copy plugin files** to your Obsidian vault:
   ```
   .obsidian/plugins/perfect-pdf-export/
   ├── main.js
   ├── manifest.json
   └── styles.css
   ```

2. **Enable the plugin**:
   - Open Obsidian Settings
   - Go to Community Plugins
   - Disable Safe Mode if needed
   - Find "Perfect PDF Export" in the list
   - Toggle it ON

3. **Verify installation**:
   - You should see a PDF icon in the left ribbon
   - Settings should have a "Perfect PDF Export" section

## Testing All Features

### 1. Basic Export

**Test the ribbon icon:**
1. Open any note in Obsidian
2. Click the PDF icon in the left ribbon
3. Print dialog should open
4. Choose "Save as PDF" in the destination dropdown
5. Save the file

**Test the command palette:**
1. Press `Cmd/Ctrl + P` to open command palette
2. Type "Perfect PDF"
3. Select "Export current note to Perfect PDF"
4. Print dialog should open

**Expected result:** Both methods should work identically.

### 2. Export Presets

**Test each preset:**

1. **Teaching Preset:**
   - Go to Settings → Perfect PDF Export
   - Select "Teaching" preset
   - Export a test note
   - Verify: 11pt font, normal margins, readable

2. **Professional Preset:**
   - Select "Professional" preset
   - Export the same note
   - Verify: 10pt font, normal margins, balanced

3. **Minimal Preset:**
   - Select "Minimal" preset
   - Export the same note
   - Verify: 9pt font, narrow margins, compact

**Expected result:** Each preset should produce visibly different output.

### 3. Page Break Prevention

Use the included `TEST.md` file or create test content with:

**Tables:**
- Create a table with 5+ rows
- Export to PDF
- Verify: Table stays on one page (if it fits)

**Callouts:**
```markdown
> [!note] Test Callout
> Line 1
> Line 2
> Line 3
```
- Verify: Callout doesn't split across pages

**Code Blocks:**
````markdown
```javascript
function test() {
    // Multiple lines
    // of code here
}
```
````
- Verify: Code block stays together

**Lists:**
- Create a list with 10+ items
- Export to PDF
- Verify: Individual list items don't split

### 4. Layout Options

**Font Size:**
1. Go to Settings → Perfect PDF Export
2. Adjust font size slider (8-14pt)
3. Export a note at different sizes
4. Verify: Font size changes are visible

**Page Orientation:**
1. Test Portrait mode with normal text
2. Test Landscape mode with wide tables
3. Verify: Orientation changes correctly

**Margins:**
1. Test Narrow (0.5in)
2. Test Normal (0.75in)
3. Test Wide (1in)
4. Verify: Margins change as expected

### 5. Content Optimization

**Table Width Optimization:**
1. Create a wide table (6+ columns)
2. Enable "Optimize table width" in settings
3. Export to PDF
4. Verify: Table fits within page width
5. Disable optimization
6. Export again
7. Verify: Behavior changes

**Word Wrap:**
1. Add very long words or URLs
2. Enable "Enable word wrap" in settings
3. Export to PDF
4. Verify: Long words wrap, no horizontal overflow
5. Disable word wrap
6. Verify: Words may overflow

### 6. Toggle Settings

Test each toggle individually:

1. **Prevent table splits:** ON/OFF
2. **Prevent callout splits:** ON/OFF
3. **Prevent list splits:** ON/OFF
4. **Optimize table width:** ON/OFF
5. **Enable word wrap:** ON/OFF

For each, verify the behavior changes when toggled.

## Test Content

Use the included `TEST.md` file which includes:
- Multiple heading levels
- Tables (narrow and wide)
- Callouts (note, warning, tip)
- Lists (ordered and unordered)
- Code blocks (JavaScript, Python)
- Blockquotes
- Long URLs
- Mixed content

## Common Issues and Solutions

### Issue: Print dialog doesn't open
**Solution:** 
- Check browser console for errors
- Reload Obsidian (Cmd/Ctrl + R)
- Disable other PDF plugins temporarily

### Issue: CSS not applying
**Solution:**
- Check that styles are being generated (console)
- Try a different preset
- Reload Obsidian

### Issue: Tables still splitting
**Solution:**
- Very large tables may still split
- Try landscape orientation
- Reduce table size or split manually

### Issue: Plugin not appearing
**Solution:**
- Verify files are in correct location
- Check manifest.json is valid
- Enable Community Plugins
- Restart Obsidian

## Manual Testing Checklist

- [ ] Plugin installs correctly
- [ ] Ribbon icon appears and works
- [ ] Command palette command works
- [ ] Settings tab loads and displays correctly
- [ ] Teaching preset works
- [ ] Professional preset works
- [ ] Minimal preset works
- [ ] Font size slider functions (8-14pt)
- [ ] Portrait orientation works
- [ ] Landscape orientation works
- [ ] Auto orientation setting exists
- [ ] Narrow margins work
- [ ] Normal margins work
- [ ] Wide margins work
- [ ] Tables don't split (when enabled)
- [ ] Callouts don't split (when enabled)
- [ ] Lists behave correctly
- [ ] Code blocks stay together
- [ ] Headings stay with content
- [ ] Table width optimization works
- [ ] Word wrap prevents overflow
- [ ] Long URLs wrap properly
- [ ] Settings are saved between sessions
- [ ] Multiple exports work consecutively
- [ ] No console errors during export
- [ ] PDF output is readable and professional

## Performance Testing

1. **Small notes (<1000 words):** Should export instantly
2. **Medium notes (1000-5000 words):** Should export in <2 seconds
3. **Large notes (>5000 words):** Should export in <5 seconds

## Browser Compatibility

Test in different browsers (if applicable):
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

Note: Obsidian uses Electron, but testing in different environments can reveal issues.

## Reporting Issues

If you find issues during testing:

1. **Check console:** Press F12 or Cmd/Ctrl+Shift+I
2. **Note error messages:** Copy any error messages
3. **Document steps:** Write exact steps to reproduce
4. **Include environment:**
   - OS version
   - Obsidian version
   - Plugin version
5. **Create minimal test case:** Simplify the content that causes issues

## Success Criteria for MVP

The plugin is MVP-ready when:

✅ All core features work without errors
✅ Export produces readable, professional PDFs
✅ Settings are saved and applied correctly
✅ Page break prevention works for most cases
✅ No critical bugs or crashes
✅ Documentation is clear and complete
✅ Performance is acceptable (<5s for typical notes)

## Next Steps After Testing

1. Document any bugs found
2. Prioritize bug fixes
3. Consider user feedback
4. Plan for v0.2.0 features
5. Prepare for release

---

**Happy Testing!** 🧪

Report issues or suggestions through GitHub Issues.
