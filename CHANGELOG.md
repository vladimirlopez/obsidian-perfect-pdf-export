# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for 0.2.0
- Batch export for folders
- Export templates (save/load custom settings)
- Live preview before export
- Custom headers and footers
- Page numbering options

### Planned for 0.3.0
- Auto-detect landscape orientation for wide tables
- Watermark support
- Table of contents generation
- HTML export option
- Export history tracking

## [0.1.0] - 2026-01-08

### Added
- Initial release
- Smart page break prevention for tables, callouts, lists, code blocks
- Table width optimization with automatic column adjustment
- Three export presets: Teaching, Professional, Minimal
- Customizable settings:
  - Font size control (8-14pt)
  - Page orientation (portrait/landscape/auto)
  - Margin settings (narrow/normal/wide)
  - Toggle individual optimizations
- Ribbon icon for quick export
- Command palette integration
- Settings tab with intuitive controls

### Features
- Prevents tables from splitting across pages
- Keeps callouts together on one page
- Intelligent list breaking (items stay together)
- Code blocks never split
- Headings stay with their content
- Automatic text wrapping to prevent horizontal overflow
- Responsive table column sizing

### Technical
- Built with TypeScript
- Uses Obsidian Plugin API
- Generates optimized CSS dynamically based on settings
- Integrates with Obsidian's native print functionality

[Unreleased]: https://github.com/yourusername/obsidian-perfect-pdf-export/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/obsidian-perfect-pdf-export/releases/tag/v0.1.0
