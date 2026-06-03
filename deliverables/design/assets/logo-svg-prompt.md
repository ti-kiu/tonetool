# Logo SVG Prompt

```
Design a minimalist SVG icon for "Tone Generator" — an online audio frequency generator tool.

Requirements:
- Output raw SVG code, not an image
- Single color: #00E5CC (cyber cyan)
- viewBox="0 0 64 64"
- Geometric design based on circles and sine waves
- Must be recognizable at 16px (favicon size)
- Only one memory point: a sine wave passing through a circular frame
- No gradients, no shadows, no 3D effects
- Clean vector paths, no raster elements

Concept: A perfect circle (like an oscilloscope screen or speaker cone) with a smooth sine wave passing horizontally through its center. The wave has 1.5 complete cycles within the circle diameter. The circle and wave share the same stroke width.

Style: Technical, precise, industrial — like an instrument panel icon.
```

## Expected SVG Structure

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" stroke="#00E5CC" stroke-width="2.5" stroke-linecap="round">
  <circle cx="32" cy="32" r="28"/>
  <path d="M8 32 Q16 12, 24 32 T40 32 T56 32"/>
</svg>
```

## Wordmark

"Tone Generator" in Space Grotesk, weight 700, tracking -0.02em.
Color: `#E8ECF0` on dark backgrounds, `#08080F` on light.

## Favicon

Same icon, 32x32 and 16x16 PNG exports.
Also provide SVG favicon for modern browsers.
