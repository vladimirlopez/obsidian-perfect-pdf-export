# Perfect PDF Export - Test Document

This document is designed to test all features of the Perfect PDF Export plugin.

## Test Instructions

1. Open this file in Obsidian
2. Click the PDF export ribbon icon or use the command palette
3. Try different export presets in settings
4. Verify each feature works correctly

## Feature Tests

### 1. Heading Test

Headings should stay with their following content and not split across pages.

#### Subheading Level 4

This paragraph should stay with the heading above it.

##### Subheading Level 5

And this one too.

### 2. Table Test

Tables should not split across pages. Column widths should be optimized automatically.

| Column 1 | Column 2 | Column 3 | Column 4 |
|----------|----------|----------|----------|
| Data A1  | Data B1  | Data C1  | Data D1  |
| Data A2  | Data B2  | Data C2  | Data D2  |
| Data A3  | Data B3  | Data C3  | Data D3  |
| Data A4  | Data B4  | Data C4  | Data D4  |

#### Wide Table Test

This table has many columns to test horizontal overflow prevention:

| Column 1 | Column 2 | Column 3 | Column 4 | Column 5 | Column 6 | Column 7 | Column 8 |
|----------|----------|----------|----------|----------|----------|----------|----------|
| Data 1   | Data 2   | Data 3   | Data 4   | Data 5   | Data 6   | Data 7   | Data 8   |
| LongWordThatShouldWrap | AnotherLongWord | MoreData | EvenMore | Testing | Wrapping | Behavior | Here |

### 3. Callout Test

Callouts should stay together on one page.

> [!note] Note Callout
> This is a note callout. It should not split across pages.
> Multiple lines should stay together.

> [!warning] Warning Callout
> This is a warning callout with important information.
> All lines should remain together.

> [!tip] Tip Callout
> Here's a helpful tip that should stay together as one unit.

### 4. List Test

List items should stay together. The entire list may break, but individual items won't.

#### Unordered List

- First item with some longer text to make it more realistic
- Second item
- Third item with even more text to demonstrate word wrapping behavior
  - Nested item 1
  - Nested item 2
  - Nested item 3
- Fourth item
- Fifth item

#### Ordered List

1. First numbered item
2. Second numbered item with longer content
3. Third numbered item
   1. Nested numbered item
   2. Another nested item
4. Fourth numbered item
5. Fifth numbered item

### 5. Code Block Test

Code blocks should never split across pages.

```javascript
function helloWorld() {
    console.log("Hello, World!");
    console.log("This is a code block");
    console.log("It should not split across pages");
    
    for (let i = 0; i < 10; i++) {
        console.log(`Iteration ${i}`);
    }
    
    return true;
}
```

```python
def process_data(data):
    """
    This function processes data
    and should stay together on one page
    """
    result = []
    for item in data:
        processed = item.upper()
        result.append(processed)
    return result
```

### 6. Blockquote Test

Blockquotes should stay together on one page.

> This is a blockquote with multiple lines.
> It contains important quoted text that should not be split.
> All these lines should remain together for proper readability.
> — Author Name

### 7. Link Test

Links should break properly if they're too long: https://this-is-a-very-long-url-that-should-break-properly-across-lines.example.com/path/to/resource

### 8. Mixed Content Test

This section combines multiple elements to test complex layouts:

Here's some text before a table:

| Feature | Status | Notes |
|---------|--------|-------|
| Smart page breaks | ✅ | Working |
| Table optimization | ✅ | Working |
| Callout handling | ✅ | Working |

> [!info] Information
> After the table, we have a callout that provides additional context.

And here's a list that follows:
- Item related to the information above
- Another related item
- One more item

### 9. Word Wrap Test

This section tests word wrapping with long words:

Supercalifragilisticexpialidocious pneumonoultramicroscopicsilicovolcanoconiosis

And a very long URL: https://www.example.com/this/is/a/very/long/path/that/should/wrap/properly/in/the/pdf/export

### 10. Font Size and Margin Test

The font size and margins should follow your preset settings:
- Teaching: 11pt, normal margins
- Professional: 10pt, normal margins  
- Minimal: 9pt, narrow margins

## Expected Results

When exporting this document:

1. ✅ All tables should appear on a single page
2. ✅ Callouts should not split
3. ✅ Code blocks should remain intact
4. ✅ Headings should stay with their content
5. ✅ Long words and URLs should wrap properly
6. ✅ List items should not split (entire list may break)
7. ✅ No horizontal overflow
8. ✅ Proper page margins according to settings
9. ✅ Consistent font size throughout
10. ✅ Professional, readable output

## Preset-Specific Tests

### Teaching Preset
- Larger font (11pt) for readability
- Normal margins
- All optimizations enabled

### Professional Preset  
- Balanced font (10pt)
- Normal margins
- Clean, business-appropriate output

### Minimal Preset
- Smaller font (9pt)
- Narrow margins
- More content per page
- Callout splits allowed

## Testing Checklist

- [ ] Open file in Obsidian
- [ ] Access plugin via ribbon icon
- [ ] Access plugin via command palette
- [ ] Test Teaching preset
- [ ] Test Professional preset
- [ ] Test Minimal preset
- [ ] Verify tables don't split
- [ ] Verify callouts stay together
- [ ] Verify code blocks stay together
- [ ] Verify word wrapping works
- [ ] Verify no horizontal overflow
- [ ] Verify custom settings apply
- [ ] Test font size slider (8-14pt)
- [ ] Test margin options
- [ ] Test orientation options
- [ ] Toggle individual optimizations

---

**End of Test Document**

This document thoroughly tests all features of the Perfect PDF Export plugin.
