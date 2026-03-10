# Gallery Captions

Each image in a gallery folder can have an optional caption file named `<image-filename>.md`.

For example, to caption `assets/images/storm26/GO8A1273.JPG`, create `assets/images/storm26/GO8A1273.JPG.md`.

**File format:**

```
Title goes here
Optional description in **markdown**.
Can span multiple lines.
```

- Line 1 is the title (used as `alt` text and displayed in the lightbox)
- Lines 2+ are the description (rendered as markdown)
- If line 1 is empty, there is no title and the rest becomes the description
- Caption files are optional — images without one get no title or description