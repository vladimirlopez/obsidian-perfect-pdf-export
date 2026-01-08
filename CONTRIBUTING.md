# Contributing to Perfect PDF Export

Thank you for considering contributing! This document provides guidelines and instructions.

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm
- Obsidian installed
- Basic TypeScript knowledge

### Setup Development Environment

1. **Fork and clone**
   ```bash
   git clone https://github.com/yourusername/obsidian-perfect-pdf-export
   cd obsidian-perfect-pdf-export
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Link to test vault**
   ```bash
   # Create symlink to your test vault
   ln -s $(pwd) /path/to/vault/.obsidian/plugins/perfect-pdf-export
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## 🎯 Priority Areas

### High Priority
- [ ] Improve PDF generation quality
- [ ] Add batch export for folders
- [ ] Landscape auto-detection
- [ ] Export preview

### Medium Priority
- [ ] Custom templates
- [ ] Headers/footers
- [ ] Page numbering
- [ ] Export history

### Nice to Have
- [ ] HTML export
- [ ] DOCX export
- [ ] Watermarks
- [ ] TOC generation

## 📝 Code Style

- Use TypeScript
- Follow Obsidian plugin conventions
- Add JSDoc comments for public methods
- Keep functions small and focused

### Example

```typescript
/**
 * Exports the current file to PDF with optimizations
 * @returns Promise that resolves when export is complete
 */
async exportCurrentFileToPDF(): Promise<void> {
    // Implementation
}
```

## 🧪 Testing

Before submitting:

1. **Test with various note types**
   - Tables (narrow, wide)
   - Callouts (nested, simple)
   - Lists (long, short)
   - Code blocks
   - Images

2. **Test all presets**
   - Teaching
   - Professional
   - Minimal

3. **Test edge cases**
   - Empty notes
   - Very long notes
   - Complex layouts

## 📦 Submitting Changes

### Pull Request Process

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clear, concise code
   - Add comments where needed
   - Update README if adding features

3. **Test thoroughly**
   - Run `npm run build`
   - Test in Obsidian
   - Check for console errors

4. **Commit with clear message**
   ```bash
   git commit -m "Add: [feature description]"
   # or
   git commit -m "Fix: [bug description]"
   # or
   git commit -m "Update: [what changed]"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open PR on GitHub

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How did you test this?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code builds without errors
- [ ] Tested in Obsidian
- [ ] Updated README if needed
- [ ] Followed code style guidelines
```

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Try with minimal theme/plugins
3. Update to latest version

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g., macOS 13.0]
- Obsidian version: [e.g., 1.4.0]
- Plugin version: [e.g., 0.1.0]

**Additional context**
Any other relevant information
```

## 💡 Feature Requests

We welcome feature ideas!

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives considered**
Other solutions you've thought about

**Additional context**
Mockups, examples, or other details

**Use case**
How would you use this feature?
```

## 🎨 Code Organization

```
obsidian-perfect-pdf-export/
├── main.ts              # Main plugin class
├── settings.ts          # Settings interface (future)
├── export.ts            # Export logic (future)
├── presets.ts           # Preset definitions (future)
├── css-generator.ts     # CSS generation (future)
└── utils.ts             # Utility functions (future)
```

## 📚 Resources

- [Obsidian Plugin API](https://github.com/obsidianmd/obsidian-api)
- [Obsidian Developer Docs](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)

## ❓ Questions?

- Open a [Discussion](https://github.com/yourusername/obsidian-perfect-pdf-export/discussions)
- Ask in Obsidian Discord #plugin-dev
- DM the maintainer

## 🙏 Thank You!

Every contribution helps make this plugin better for thousands of users!

---

*Happy coding!* 🚀
