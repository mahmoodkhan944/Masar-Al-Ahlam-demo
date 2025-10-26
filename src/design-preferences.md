# Brand Design Preferences

## Theme
RapidLine Immigration needs a professional, trustworthy, and welcoming mood. The UI should feel clean and organized, using clear hierarchies and ample whitespace to guide users through service information and contact forms. **Mode**: **alternating** – light base with ~30 % dark sections interleaved for contrast and focus.

## Style
**Material Design**  
*Look & Feel*: Layered surfaces, subtle elevation shadows, grid‑aligned components, and purposeful motion.  
*Mood*: Polished, reliable, user‑centric. Ideal for a service‑oriented business that values clarity and confidence.

## Color Palette
- **Primary** – Trustworthy Blue  
  - Hue: 210‑225° (cool blue)  
  - Saturation: 70 %‑90 %  
  - Lightness: 40 %‑55 %  
  - Example: `hsl(215,80%,45%)`

- **Secondary** – Calming Teal  
  - Hue: 170‑185° (blue‑green)  
  - Saturation: 60 %‑80 %  
  - Lightness: 45 %‑60 %  
  - Example: `hsl(175,70%,50%)`

- **Accent** – Warm Amber (CTA)  
  - Hue: 35‑45° (orange‑amber)  
  - Saturation: 80 %‑100 %  
  - Lightness: 45 %‑55 %  
  - Example: `hsl(40,95%,50%)`

- **Backgrounds**  
  - Light base: **White** (`#ffffff`).  
  - Dark sections: Neutral gray‑black: `hsl(0,0%,12%)` (provides 4.5:1+ contrast with white text).  
  - Surface cards: `hsl(0,0%,98%)` with subtle elevation shadow.

- **Text**  
  - Primary text: Black (`hsl(0,0%,10%)`) on light background – 21:1 contrast.  
  - Text on dark sections: White (`hsl(0,0%,100%)`) – 15:1 contrast.  
  - Secondary text (muted): `hsl(0,0%,45%)` on light, `hsl(0,0%,70%)` on dark – both meet 4.5:1.

- **Usage notes**  
  - Avoid placing primary blue text directly on dark gray sections (fails contrast).  
  - Use accent amber only for buttons/links; keep surrounding area neutral to maintain readability.  
  - Do not use low‑saturation gray text on light surfaces (contrast < 4.5).

## Layout
- **Grid**: 12‑column responsive grid. Max page width: **80 rem** (≈1280 px).  
- **Horizontal padding**: 24 px on mobile, 32 px+ on desktop.  
- **Spacing scale**: 4 px base; increments of 4 px (4, 8, 12, 16, 24, 32, 48, 64 px).  
- **Hierarchy**:  
  - Hero section: full‑width background image with centered headline, primary CTA button (amber).  
  - Primary CTA visible above the fold, ≥44 px tap target.  
  - Secondary sections stacked vertically, alternating light/dark backgrounds.  
- **Alignment**: Hero text centered; body copy left‑aligned for readability; cards centered within their column group.  
- **Responsiveness**: Mobile‑first breakpoints at 640 px, 960 px, 1280 px. Images and cards reflow to 1‑column on mobile, 2‑column on tablet, 3‑4‑column on desktop.  
- **Components**:  

  ### Cards
  - Border: **none** (rely on shadow).  
  - Shadow: `0 2px 8px rgba(0,0,0,0.1)` for light cards; `0 2px 6px rgba(0,0,0,0.3)` for cards on dark sections.  
  - Corner radius: **8 px** (soft, modern).  

  ### Buttons
  - Primary (amber): background `hsl(40,95%,50%)`, white text, no border, 8 px radius.  
  - Secondary (blue): background `hsl(215,80%,45%)`, white text, 8 px radius.  
  - Hover: increase lightness by +5 % and add subtle elevation (`translateY(-2px)`).  

  ### Inputs
  - Border: 1 px solid `hsl(0,0%,80%)`.  
  - Radius: 6 px.  
  - Focus: outline `hsl(215,80%,45%)` 2 px solid, background remains white.

## Typography
- **Heading family**: `Roboto Slab` (serif) – conveys authority.  
  - Weights: 700 (H1‑H2), 500 (H3‑H4).  
- **Body family**: `Roboto` (sans‑serif) – highly readable.  
  - Weight: 400 regular, 500 medium for emphasis.  
- **Scale** (mobile‑first):  
  - H1: 48 px (line‑height 1.2)  
  - H2: 36 px (1.3)  
  - H3: 28 px (1.4)  
  - H4: 22 px (1.5)  
  - Body: 16 px (1.6)  
  - Small/Caption: 14 px (1.6)  
- Minimum body size **16 px** ensures legibility.  
- Use generous line‑height (≥1.5) for paragraphs; maintain 24 px vertical rhythm.

## Imagery and Iconography
- **Image type**: Professional photography of diverse families, travelers, and staff; warm lighting, natural colors.  
- **Tone**: Hopeful, inclusive, supportive.  
- **Treatments**: Light overlay (5 % black) on dark sections to improve text readability; subtle blue‑teal gradient overlay on hero image (`linear-gradient(to bottom, hsla(215,80%,45%,0.3), transparent)`).  
- **Icons**: Stroke style, 24 px grid, line weight 2 px, using primary blue for outlines and amber for active states. Consistent line‑icon set (e.g., Material Icons).  

## Animations
- **Section reveal**: Fade‑in‑up on scroll (`opacity:0 → 1`, `transform: translateY(20px) → 0`). Duration **200 ms**, easing `cubic-bezier(0.4, 0, 0.2, 1)`.  
- **Button interaction**: Scale to 1.02 on hover/focus, 150 ms, same easing.  
- **Respect prefers‑reduced‑motion**: If user prefers reduced motion, disable scroll‑based fade‑in and use simple appear (no translation).  
- Keep all motion subtle; avoid distracting loops.