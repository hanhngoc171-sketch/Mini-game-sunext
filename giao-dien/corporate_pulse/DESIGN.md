---
name: Corporate Pulse
colors:
  surface: '#f2fcee'
  surface-dim: '#d3ddcf'
  surface-bright: '#f2fcee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ecf7e9'
  surface-container: '#e7f1e3'
  surface-container-high: '#e1ebdd'
  surface-container-highest: '#dbe5d8'
  on-surface: '#151e15'
  on-surface-variant: '#414941'
  inverse-surface: '#2a332a'
  inverse-on-surface: '#eaf4e6'
  outline: '#727970'
  outline-variant: '#c1c9be'
  surface-tint: '#3a6843'
  primary: '#204e2b'
  on-primary: '#ffffff'
  primary-container: '#386641'
  on-primary-container: '#afe2b3'
  inverse-primary: '#a0d3a5'
  secondary: '#984800'
  on-secondary: '#ffffff'
  secondary-container: '#fc7d05'
  on-secondary-container: '#5c2900'
  tertiary: '#584100'
  on-tertiary: '#ffffff'
  tertiary-container: '#755800'
  on-tertiary-container: '#fcd069'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcefc0'
  primary-fixed-dim: '#a0d3a5'
  on-primary-fixed: '#00210a'
  on-primary-fixed-variant: '#22502d'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#ffb689'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#733500'
  tertiary-fixed: '#ffdf9c'
  tertiary-fixed-dim: '#ecc15c'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#f2fcee'
  on-background: '#151e15'
  surface-variant: '#dbe5d8'
  soft-cream: '#FFF4A4'
  surface-white: '#FFFFFF'
  app-bg: '#F8FAF8'
  border-subtle: '#D8E0D8'
  error-red: '#D92D20'
  success-green: '#2E7D32'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 90px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 64px
  gutter: 16px
  container-max: 1280px
---

## Brand & Style

The design system is crafted for a professional internal corporate environment, balancing high-energy engagement with executive-level refinement. The brand personality is **authoritative, energetic, and streamlined**. It aims to evoke a sense of "competitive focus" rather than "playful distraction."

The chosen style is **Modern Corporate Minimalism with Tactile Depth**. It utilizes heavy whitespace and a restricted color palette to maintain clarity, while employing soft shadows and substantial border radii (16px) to make the interface feel approachable and physically interactable. Unlike consumer quiz apps, this system avoids frantic animations and neon gradients, opting instead for solid color blocks and clear structural hierarchy to ensure the game feels like a premium company tool.

## Colors

The palette is anchored by **Forest Green**, representing stability and the corporate identity. **Vivid Orange** is used exclusively for high-priority calls to action (CTAs) and active game states, ensuring users never hunt for the "Next" or "Join" button. **Warm Yellow** and **Soft Cream** provide a sophisticated layer for secondary information, such as leaderboards and background containers, adding warmth without sacrificing professional tone.

### Color Application Rules:
- **Primary (Forest Green):** Used for navigation, headers, and administrative buttons.
- **Secondary (Vivid Orange):** Reserved for "Participate," "Start Game," and critical countdowns.
- **Tertiary (Warm Yellow):** Used for scores, ranking badges, and highlighting achievements.
- **Neutral (Gray 800):** Primary text color to ensure high legibility against white and cream backgrounds.

## Typography

The system uses **Be Vietnam Pro** across all levels to ensure a clean, contemporary, and highly readable experience in Vietnamese. Typography is used to create a clear information hierarchy:

- **Room PINs & Scores:** Use `display-lg` with a bold weight (700) to ensure visibility from a distance on projector screens.
- **Questions:** Use `headline-lg` for maximum impact and readability during fast-paced play.
- **Body Copy:** Maintained at a minimum of 16px to ensure accessibility on mobile devices.
- **Labels:** Used for button text and metadata, emphasizing clarity and action.

## Layout & Spacing

This design system follows a **4px-base spacing rhythm**. The layout model is a **fluid grid** with fixed-width containers for desktop to prevent line lengths from becoming unreadable.

### Breakpoints & Reflow:
- **Mobile (<768px):** 1-column layout, 16px side margins. Answer cards stack vertically for easy thumb tapping.
- **Tablet (768px - 1024px):** 2-column grid for answer choices. 24px margins.
- **Desktop/Projector (>1024px):** Centered containers (max 1280px). Administrative sidebars appear on the left, while game content stays centered for visibility.

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. 

The background uses a very light gray (`#F8FAF8`), allowing white cards (`#FFFFFF`) to pop with a subtle, diffused shadow. This creates a clear "layer" between the application frame and the interactive content. High-priority cards, such as the current question or the Top 1 winner, utilize a slightly more aggressive shadow or a Soft Cream (`#FFF4A4`) background to draw immediate attention. We avoid bold borders in favor of these soft depth cues to maintain the "Modern Corporate" aesthetic.

## Shapes

The shape language is consistently **Rounded**. This softens the corporate feel and makes the large buttons and cards feel "touchable."

- **Cards:** Use `rounded-lg` (16px) for the primary container.
- **Buttons & Inputs:** Use 12px rounding to balance the larger card corners.
- **Badges/Pills:** Use full rounding (pill-shaped) for status indicators like "Online" or "Draft" to distinguish them from actionable buttons.

## Components

### Buttons
- **Action CTA (Orange):** Minimum height of 56px for mobile. Bold white text. This is the "Join" or "Submit" button.
- **Navigation/Admin (Green):** Standard height 48px. Used for "Edit Quiz" or "Save."
- **Secondary:** White background with a Forest Green border. Used for "Cancel" or "Back."

### Answer Cards
Answer cards are the most critical component. They must have a minimum height of 64px, featuring a bold letter label (A, B, C, D) on the left. On selection, the card should scale down slightly (98%) and gain a thick Forest Green border.

### Input Fields
Inputs use a 12px radius and a light gray border (`#CBD5CB`). Upon focus, the border shifts to Forest Green with a 15% opacity green glow. The **Room PIN input** is specialized: centered text, 36px font size, and increased letter spacing.

### Leaderboard Cards
The "Top 1" card features a subtle gradient from Warm Yellow to Soft Cream with a Vivid Orange border. "Top 2-5" cards are white with a Soft Cream avatar circle. This visual distinction ensures the winner is immediately recognizable.

### Progress Bars
Used for countdown timers. The bar transitions from Forest Green to Vivid Orange as time runs below 5 seconds, finally turning Red only in the final 2 seconds to create urgency without inducing panic early.