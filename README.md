# Perfect PDF Export

Professional PDF export for Obsidian with smart page breaks, table optimization, and automatic layout fixes.

## 🎯 Features

### ✅ Smart Page Breaks
- **Tables**: Prevents tables from splitting across pages
- **Callouts**: Keeps callout boxes together
- **Lists**: Intelligent list breaking (items stay together)
- **Code blocks**: Never split code in the middle
- **Headings**: Keeps headings with their content

### 📊 Table Optimization
- Automatic column width adjustment
- Horizontal overflow prevention
- Responsive text wrapping
- Optimized padding and spacing

### 🎨 Export Presets
- **Teaching**: Readable fonts, optimized for lessons (11pt)
- **Professional**: Clean, balanced layout (10pt)
- **Minimal**: Compact, more content per page (9pt)

### ⚙️ Customization
- Font size control (8-14pt)
- Page orientation (portrait/landscape/auto)
- Margin settings (narrow/normal/wide)
- Toggle individual optimizations

## 🚀 Quick Start

### Installation

1. Download the latest release
2. Extract to `.obsidian/plugins/perfect-pdf-export/`
3. Enable in Settings → Community Plugins

### Usage

**Method 1: Ribbon Icon**
- Click the PDF icon in the left sidebar

**Method 2: Command Palette**
- Press `Cmd/Ctrl + P`
- Type "Perfect PDF"
- Select "Export current note to Perfect PDF"

**Method 3: Right-click**
- Right-click on a note
- Select "Export to Perfect PDF"

## 📖 How It Works

The plugin applies intelligent CSS optimizations when exporting:

1. **Analyzes content**: Detects tables, callouts, lists
2. **Applies rules**: Prevents splits where needed
3. **Optimizes layout**: Adjusts spacing and wrapping
4. **Exports**: Uses Obsidian's print functionality with enhancements

## 🎓 Use Cases

### For Teachers
- Lesson plans with tables intact
- Curriculum documents with callouts
- Handouts with proper formatting
- Assignment sheets

### For Students
- Study notes for printing
- Assignment submissions
- Report formatting
- Research papers

### For Professionals
- Meeting notes
- Project documentation
- Client deliverables
- Reports and proposals

## 🛠️ Development

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/obsidian-perfect-pdf-export
cd obsidian-perfect-pdf-export

# Install dependencies
npm install

# Start development mode
npm run dev
```

### Build

```bash
# Production build
npm run build
```

### Testing

1. Copy `main.js`, `manifest.json`, `styles.css` to your test vault
2. Location: `.obsidian/plugins/perfect-pdf-export/`
3. Reload Obsidian
4. Test with various note types

## 📋 Roadmap

### Version 0.1.0 (Current)
- [x] Basic export functionality
- [x] Page break prevention
- [x] Table optimization
- [x] Export presets
- [x] Settings tab

### Version 0.2.0 (Planned)
- [ ] Batch export (folders)
- [ ] Export templates (save/load settings)
- [ ] Live preview before export
- [ ] Custom headers/footers
- [ ] Page numbering

### Version 0.3.0 (Future)
- [ ] Auto-detect landscape for wide tables
- [ ] Watermark support
- [ ] Table of contents generation
- [ ] HTML export option
- [ ] Export history

## 🐛 Known Issues

- **Large tables**: Very wide tables may still overflow (use landscape mode)
- **Complex layouts**: Nested callouts may have spacing issues
- **Mobile**: Desktop-only for now

## 💡 Tips

1. **Use Reading Mode**: Switch to reading mode before exporting for best results
2. **Test presets**: Try different presets to find what works best
3. **Landscape for tables**: Enable landscape mode for table-heavy documents
4. **Simplify if needed**: Combine columns in very wide tables

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Inspired by the Obsidian community's feedback on PDF export issues
- Built on the excellent Obsidian plugin API
- CSS optimizations based on real-world teacher workflows

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/obsidian-perfect-pdf-export/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/obsidian-perfect-pdf-export/discussions)
- **Discord**: Obsidian Discord #plugin-support

## ☕ Donate

If you find this plugin helpful, consider:
- ⭐ Starring the repository
- 💬 Sharing with others
- ☕ [Buy me a coffee](https://ko-fi.com/yourusername)

---

**Made with ❤️ for the Obsidian community**
