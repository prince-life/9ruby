# NovaVox Web — Design System

> Stitch-compatible design system. Brutalist monochrome spatial interface.

---

## Visual Theme & Atmosphere

- **Mood**: Technical, brutalist, monolithic — a dark spatial command center.
- **Density**: Sparse — large whitespace, dramatic typography, information in structured nodes.
- **Philosophy**: Pure monochrome. No decorative color. White on black with gray hierarchy. Sharp geometry, 1px borders, uppercase micro-labels. Inspired by architectural brutalism and spatial computing interfaces.

---

## Color Palette & Roles

| Token               | Hex         | Role                                       |
|----------------------|-------------|---------------------------------------------|
| `pure-black`         | `#000000`   | App background, primary surface             |
| `deep-black`         | `#0A0A0A`   | Subtle surface elevation                    |
| `tech-gray-900`      | `#141414`   | Card backgrounds, containers                |
| `tech-gray-800`      | `#1E1E1E`   | Borders, dividers, secondary surfaces       |
| `tech-gray-600`      | `#444444`   | Disabled / tertiary text                    |
| `tech-gray-400`      | `#888888`   | Muted text, labels, secondary content       |
| `pure-white`         | `#FFFFFF`   | Primary text, active elements               |
| `grid-line`          | `rgba(255,255,255,0.05)` | Grid background lines           |
| `accent-white-10`    | `rgba(255,255,255,0.1)`  | Subtle borders, dividers        |
| `accent-white-20`    | `rgba(255,255,255,0.2)`  | Active borders                  |

### Functional Color (minimal, used sparingly)
| Token               | Hex         | Role                                       |
|----------------------|-------------|---------------------------------------------|
| `status-active`      | `#FFFFFF`   | Online / active indicator (white dot)       |
| `status-inactive`    | `#444444`   | Inactive indicator                          |

---

## Typography Rules

- **Heading font**: `"Space Grotesk", sans-serif` — bold, geometric, brutalist.
- **Body font**: `"Inter", sans-serif` — clean reading.
- **Mono font**: `"JetBrains Mono", monospace` — technical labels, code, data.
- **Scale**:
  - Display: 8vw (clamp 48–128px) / 700 weight / -0.04em tracking / line-height 0.9
  - Heading 1: 48px / 700 weight / -0.02em tracking / uppercase
  - Heading 2: 32px / 700 weight / -0.01em tracking / uppercase
  - Heading 3: 20px / 700 weight / 0.1em tracking / uppercase
  - Tech Label: 9px / 500 weight / 0.2–0.4em tracking / uppercase / JetBrains Mono / color: gray-400
  - Body: 14px / 400 weight / normal
  - Data Value: 9px / 400 weight / JetBrains Mono / white
  - Caption: 11px / 400 weight / uppercase / 0.2em tracking

---

## Spacing & Layout

- **Base unit**: 8px
- **Spacing scale**: 8, 16, 24, 32, 48, 64, 80, 120px
- **Card padding**: 24px (mobile), 40px (desktop)
- **Section gaps**: 32px (mobile), 48px (desktop)
- **Page margin**: 24px (mobile), 48px (desktop)

---

## Component Stylings

### Cards / Containers
- Background: `tech-gray-900` (#141414)
- Border: 1px solid `tech-gray-800` (#1E1E1E)
- Border radius: 0px (sharp / brutalist) — or 2px max
- Shadow: none
- Hover: background shifts to `tech-gray-800`

### Buttons
- **Primary (Action)**: Transparent bg, 1px solid `tech-gray-800`, mono 10px uppercase 0.4em tracking
- **Primary Hover**: White bg, black text, white border
- **Min height**: 44px
- **Padding**: 12px 24px
- **Border radius**: 0px

### Inputs
- Background: transparent
- Border: none, bottom-border only 1px solid `white/20`
- Focus: border becomes solid white
- Font: JetBrains Mono, 10px, uppercase, wide tracking

### Labels / Tags
- Font: JetBrains Mono
- Size: 9px
- Transform: uppercase
- Letter spacing: 0.2em
- Color: `tech-gray-400`

### Navigation
- **Top bar**: Fixed, 60px tall, black/80 + backdrop-blur
- **Links**: JetBrains Mono, 10px, uppercase, 0.3em tracking, gray-400, hover: white
- **Active**: white text

### Status Indicators
- Active: white dot, no color
- Inactive: gray dot

---

## Layout Principles

- **Spatial**: Full-viewport sections, content centered.
- **Grid background**: Subtle white lines at 80px intervals.
- **Mobile first**: Stack vertically, reduce type scale.
- **Desktop**: Side-by-side layouts, large headings.
- **Whitespace**: Extremely generous — brutalist negative space.
- **No decorative gradients**: Flat surfaces only.
- **Images**: Grayscale filter, reduced opacity.
