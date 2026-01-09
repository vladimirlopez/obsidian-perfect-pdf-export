# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Future Enhancements
- Auto-detect landscape orientation for wide tables
- Watermark support
- Table of contents generation
- HTML export option
- Export history tracking

## [2.0.0] - 2026-01-09

### Added - Version 2.0.0 Features
- **Batch Export**: Export entire folders to PDFs at once
- **Export Templates**: Save and load custom export settings configurations
- **Live Preview**: Optional preview modal before exporting
- **Custom Headers/Footers**: Add custom text to page headers and footers
- **Page Numbering**: Configurable page numbers with position control (top/bottom, left/center/right)
- **Enhanced Table Handling**: Improved large table overflow handling with fixed table layout
- **Better Nested Callouts**: Fixed spacing issues with complex nested callouts
- **Mobile Support**: Plugin now works on mobile devices (previously desktop-only)

### Fixed - Known Issues Resolution
- Fixed large table overflow issues with improved table layout algorithm
- Fixed complex nested callouts spacing problems with enhanced CSS rules
- Added mobile device support

### Improved
- Better table optimization with fixed layout for consistent rendering
- Enhanced callout styling with proper nested spacing
- More robust PDF generation for various content types

### Technical
- Expanded settings interface with new configuration options
- Added template management system
- Implemented preview modal functionality
- Enhanced CSS generation with page numbering and header/footer support

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

[Unreleased]: https://github.com/vladimirlopez/obsidian-perfect-pdf-export/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/vladimirlopez/obsidian-perfect-pdf-export/releases/tag/v2.0.0
[0.1.0]: https://github.com/vladimirlopez/obsidian-perfect-pdf-export/releases/tag/v0.1.0
