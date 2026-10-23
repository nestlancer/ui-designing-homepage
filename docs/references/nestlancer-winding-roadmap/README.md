# Nestlancer · winding roadmap prototype

Redesigned from the original portfolio prototype using the supplied Visme timeline image as visual direction.

## Open
Open `index.html` in a modern browser. No packages or build step required. Optionally use `python -m http.server 3000`.

The separately provided `nestlancer-roadmap-prototype.html` embeds all images, fonts, CSS, and JavaScript into one portable file. The interface works offline; outbound links need internet access.

## Design
- Lavender dotted canvas, dashed snake-shaped route, rounded turns
- Blue, violet, and coral milestones with category icons and numbered project stops
- Three-column desktop layout, two-column tablet layout, single-column winding mobile path
- All 8 original projects, images, stacks, summaries, and live case-study links retained
- Light/dark toggle, mobile menu, cookie controls, scroll progress and active stop indicators

## Edit
- `index.html`: content and portfolio cards (`.road-stop`, `.road-card`); retain project elements in numerical DOM order.
- `roadmap.css`: new design and responsive styling, overriding the base styles.
- `roadmap.js`: responsive SVG route; desktop stops snake across rows in numerical order. Path dimensions are recalculated as images, fonts, or viewport dimensions change.
- `styles.css`: original base page styles and fonts.
- `script.js`: theme/menu/cookie/scroll behaviors.
- `assets/`: local project images, logos, and fonts.

## Scope
Front-end prototype only. External project details, sign-in, contact, and other pages open the original website; those screens and backend services have not been recreated. Theme and cookie choices are local preferences only. No analytics or tracking.

Nestlancer content, branding, and assets belong to their respective owners. Design direction references https://visme.co/blog/wp-content/uploads/2021/08/4.jpg; the reference JPG is not embedded or used as a page background. Replace branding/assets and verify usage rights before publication.
