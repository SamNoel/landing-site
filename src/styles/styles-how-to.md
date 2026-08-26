# How to use styles

Style files are designed to be functionally-independent, maximally-flexible, and easily-searchable.
For this reason, we have separated stylesheets into various files, which are summarized below.

These stylesheets are meant to serve as a baseline for library styling. Some components may use their
own custom styling depending on how custom that component is. Components that use mostly baseline styling
are grouped under the components/generic folder. Components that use more custom styling are grouped
under the components/custom folder. This gives maximum reusability while still allowing components to
remain flexible in their styling.

---

## Global.css

This file contains only a few globally-applied settings, such as zero-ing out margins and padding.

## Tokens.css

All code values live in tokens.css. This includes hex values, rem values and pixel values.
Variables are named by their most flexible function:

- Colors
- Text
- Space

Color options are as follows and can go in increments of 50:

- 100
- 200
- 300
- 400
- 500
- 600
- 700
- 800
- 900

Size options are as follows:

- xs
- sm
- md
- lg
- 2x
- 3x
- 4x
- 5x
- 6x

## Font.css

This file contains all the font types and sizes for each text-based html tag.

## Color.css

This file contains all values related to color. This can include things like:

- Headings
- Paragraphs
- Surface colors
- etc.

## Spacing.css

This file contains all values related to sizing. This can include things like:

- Paddings
- Gaps
- Widths

## Animations.css

This file contains all animation and transition properties.

## Direction.css

This file contains classes related to directional properties, such as justify and align.
