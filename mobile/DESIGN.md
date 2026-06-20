---
name: my-finance
description: A minimal, elegant personal finance tracker
colors:
  primary: "#58a49f"
  success: "#25A969"
  danger: "#F95B51"
  neutral-bg-light: "#ffffff"
  neutral-bg-dark: "#000000"
  neutral-text-light: "#000000"
  neutral-text-dark: "#ffffff"
typography:
  body:
    fontFamily: "System"
    fontWeight: 400
  mono:
    fontFamily: "SpaceMono"
    fontWeight: 400
rounded:
  md: "16px"
  lg: "24px"
  xl: "40px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
---

# Design System: my-finance

## 1. Overview

**Creative North Star: "The Clay Sanctuary"**

A calm, tactile personal finance experience built on claymorphism—soft shadows, rounded corners, and subtle depth that feels approachable and trustworthy. The interface is minimal, elegant, and sophisticated, with every element serving a clear purpose. No clutter, no noise, just clarity.

This system explicitly rejects busy/overwhelming UI and cartoonish/playful aesthetics.

**Key Characteristics:**

- Claymorphism design language
- Minimal, focused layouts
- Soft, tactile depth
- Calm, neutral backgrounds
- Clear, readable typography

## 2. Colors

A restrained palette with one primary accent and dedicated success/danger colors for clarity.

### Primary

- **Muted Teal** (#58a49f): Primary accent for CTAs, active states, and key information. Used sparingly for emphasis.

### Semantic

- **Forest Green** (#25A969): Success states, positive trends, and "good" financial indicators.
- **Coral Red** (#F95B51): Danger states, errors, and "needs attention" indicators.

### Neutral

- **Pure White** (#ffffff): Light mode background.
- **Pure Black** (#000000): Dark mode background.
- **Black Text** (#000000): Light mode primary text.
- **White Text** (#ffffff): Dark mode primary text.

### Named Rules

**The Restraint Rule.** Primary accent is used on ≤10% of any given screen. Its rarity is the point.
**The Semantic Clarity Rule.** Success and danger colors are only used for their specific states—never decoration.

## 3. Typography

**Body Font:** System (iOS/Android native sans-serif)
**Mono Font:** SpaceMono (for numbers, amounts)

**Character:** Clean, readable, and neutral. System fonts feel native and familiar; monospace adds precision for financial numbers.

### Hierarchy

- **Title** (700, 20px): Screen titles and section headers.
- **Body** (400, 17px): Primary content, descriptions.
- **Label/Mono** (400, 16px, SpaceMono): Financial amounts, dates, and numeric data.

## 4. Elevation

Claymorphism depth created with soft, subtle shadows and rounded corners. Surfaces feel lifted but not floating.

### Shadow Vocabulary

- **Clay Lift:** Soft, diffuse shadow (20–40px blur, low opacity) for elevated surfaces like cards and buttons.

### Named Rules

**The Clay Rule.** All elevated surfaces use soft shadows and rounded corners (≥16px radius) to feel tactile.

## 5. Components

### Buttons

- **Shape:** Rounded corners (24px)
- **Primary:** Muted Teal (#58a49f) background, white text, 16px horizontal padding, 12px vertical padding
- **State:** Clay lift shadow on press/hover

### Cards / Containers

- **Corner Style:** Rounded (16px)
- **Background:** Neutral background with subtle clay shadow
- **Internal Padding:** 16px (md)

### Inputs / Fields

- **Style:** Rounded corners (16px), light border/background
- **Focus:** Subtle clay lift

### Navigation

- **Style:** Minimal, with muted teal active state

## 6. Do's and Don'ts

### Do:

- **Do** use claymorphism with soft shadows and rounded corners (≥16px)
- **Do** use primary accent sparingly (≤10% of screen)
- **Do** use monospace for all financial numbers
- **Do** maintain WCAG 2.1 AA contrast ratios
- **Do** consider color blindness (use patterns + color)

### Don't:

- **Don't** use busy/overwhelming UI (keep it minimal)
- **Don't** use cartoonish/playful aesthetics
- **Don't** overuse primary accent color
- **Don't** skip reduced motion support
