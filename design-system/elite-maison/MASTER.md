# Design System Master File — Elite Maison (adapted)

UI/UX Pro Max recommended Liquid Glass, Cormorant/Montserrat, and a generic black/gold palette.
**Those recommendations conflict with Elite Maison brand truth and were rejected.**

Adapted methodology actually used:

| Pro Max output | Decision |
|---|---|
| Pattern: Scroll-Triggered Storytelling | **Keep** — Home as chapters with a progress indicator |
| Style: Liquid Glass | **Reject** — translucency/blur fights architectural Ink/Ivory |
| Style: Editorial Grid / Magazine | **Keep** — asymmetric columns, rules, pull quotes |
| Landing: Trust & Authority | **Keep** — hero → verified proof → solution → CTA. No invented testimonials |
| Landing: Feature-rich card showcase | **Reject** — cards as default are the current UX debt |
| Motion: Stagger List + page transition 200–300ms, exit faster than enter | **Keep**, without bounce/`back.out` |
| Typography: Cormorant / Montserrat | **Reject** — Times/Tinos + Noto Naskh Arabic |
| Colors: stone/black + #A16207 | **Reject** — Ink `#06182D`, Gold `#D9A537`, Ivory `#F2ECE6`, Plum `#32102E` |
| Sticky nav that hides | **Replace** — compact on scroll down, restore on scroll up (never hide) |
| Form error summary | **Add** — plus existing inline errors |
| Density 4 / Motion 7 / Variance 7 | **Keep as dials** |

## Locked brand tokens

```css
--color-ink: #06182D;
--color-gold: #D9A537;
--color-ivory: #F2ECE6;
--color-plum: #32102E;
--color-sand: #C9B89E;
--radius: 0;
--shadow: none;
```

## Motion architecture (living interface)

A living interface reacts to entry, scroll, navigation, focus, hover, selection, content progression, and intent.

- Instant 80–120ms: pressed, focus border
- Fast 160–220ms: hover, filters, arrows
- Base 280–360ms: menus, accordions, panels
- Editorial 600–900ms: hero, arch, featured case
- Exit always faster than enter
- Reduced motion: final readable state immediately

## Page personalities

- Home: cinematic editorial chapters
- About: institutional, calm
- Consulting: structured explorer
- Execution: active alternating modules
- Sectors: comparative index + panel
- Cases: featured story + dense index
- Insights: knowledge library + sticky topics
- Contact: conversion, quiet, progressive disclosure
