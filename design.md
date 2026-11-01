# Selin Baby Store — Design System

## Brand direction

Selin is a frontend-only baby and children's essentials boutique. Follow the owner-supplied reference board and the original logo artwork in `public/brand/`. Keep the identity playful, cheerful, soft, and welcoming while presenting products with modern, editorial clarity and a premium boutique feel.

Use `public/brand/selin-logo.png` (or its matching SVG) as supplied. Do not recreate, crop, recolor, or otherwise alter its artwork. The logo artwork includes the “KIDS STORE” subtitle and small hearts; do not add the separate “Everything Your Little One Needs” tagline beneath it in the header. Any tagline used elsewhere remains editable interface text. The current site language is English.

## Color palette and use

Define the owner-selected colors as CSS custom properties and use their exact values:

- Pink: `#F28CA3`
- Peach: `#FFC692`
- Sage green: `#AFC9A8`
- Lavender: `#B8A1E0`
- Warm cream: `#FFF7F1`

Use these colors intentionally across section surfaces, image framing, badges, and controls; keep white and warm cream as breathing space rather than painting every section the same color. Use dark readable text on pastel fills. Supporting dark text and semantic states may use contrast-safe neutrals, but do not replace or alter the core palette.

- White: `#FFFFFF`
- Main text: `#302A29`
- Secondary text: `#77706C`
- Border: `#E9E2DC`
- Sale: `#B84F4F`
- Success: `#4F7D5B`

Primary actions use a brand pink or a contrast-safe deep rose treatment; secondary actions can use sage, peach, or lavender with dark text. Sale labels use a contrast-safe dark surface; new labels use a light brand accent with dark text. Preserve visible keyboard focus rings.

## Photography and image sources

- Keep images bright and natural, with a consistent editorial feel and intentional crops. Use real photography rather than decorative placeholder illustrations.
- The palette frames photography rather than tinting every tile: category imagery has landscape crops; product cards share consistent 4:3 frames; hero and promotion imagery have wider, responsive crops.
- Match images to what the category or product actually is. Show garments or babies wearing garments for clothing, feeding tools or feeding moments for feeding, real toys for toys, and grouped essentials for kits when possible.
- Current local JPEG assets live in `public/images/` and are referenced with root-relative `/images/...` paths. Local files avoid runtime dependence on remote image hosts. `ImageWithFallback` retains a calm neutral fallback for load failures.
- Meaningful images have descriptive alt text. Alt text describes only what the image depicts, not unshown contents of a named product.
- Asset source pages are recorded below for traceability. This is not a claim that any image is licensed or cleared for commercial use; verify rights before commercial deployment.

### Owner-provided image set

- The current owner-provided image board is split at its panel boundaries into local assets under `public/images/selin-reference-*.png`; the original panel contents are kept intact. `selin-floral-romper.png` is the separately supplied full-resolution clothing photo. These files are used for the homepage hero, matching category imagery, the sleep promotion, and the bottle-set product photo. No licensing or commercial-use status is asserted for these supplied files.

### Current asset sources and known gaps

- Hero mother and baby: [Unsplash source page](https://unsplash.com/photos/smiling-woman-carrying-baby-RWgE9_lKj_Y) (`hero-mother-baby.jpg`)
- Clothing category baby in knitwear: [Unsplash source page](https://unsplash.com/photos/a-baby-wearing-a-white-knitted-outfit-and-booties-4vJk0dt8TNw) (`category-clothing.jpg`)
- Newborn category: [Unsplash source page](https://unsplash.com/photos/newborn-baby-wearing-a-white-hat-and-pink-dress-zYhtFl4mC70) (`category-newborn.jpg`)
- Feeding category: [Unsplash source page](https://unsplash.com/photos/person-feeding-baby-from-feeding-bottle-TCYj_UxoIUY) (`category-feeding.jpg`)
- Bath category: [Unsplash source page](https://unsplash.com/photos/girl-covered-with-white-towel-UvZzgPeDl60) (`category-bath-care.jpg`)
- Sleep category: user-provided image (`category-sleep.webp`), depicting a smiling baby in a red sleeper beside a knitted teddy bear; the image includes a visible AI-generated watermark.
- Toys category: [Unsplash source page](https://unsplash.com/photos/wooden-shape-sorter-toy-with-colorful-blocks-E1shiIGT8Oo) (`category-toys.jpg`)
- Accessories category: [Unsplash source page](https://unsplash.com/photos/closeup-photo-of-white-shoes-9BMvbnkwVZ0) (`category-accessories-white-shoes.jpg`)
- Bodysuit: [Unsplash source page](https://unsplash.com/photos/baby-in-white-onesie-lying-on-white-textile-nfF-8tF5gsc) (`product-bodysuit.jpg`)
- Romper: [Unsplash source page](https://unsplash.com/photos/smiling-baby-in-grey-romper-OJOE587CWuE) (`product-romper.jpg`)
- Knit cardigan: [Pexels source page](https://www.pexels.com/photo/baby-in-white-sweater-sitting-on-the-floor-3965550/) (`product-cardigan-pexels.jpg`)
- Hospital starter kit: [Pexels source page](https://www.pexels.com/photo/black-and-white-striped-baby-outfit-flat-lay-34121887/) (`product-hospital-set-pexels.jpg`). The photo shows an outfit, hat, and shoes, but not the listed mittens or swaddle; treat it as a representative image until a full-kit photograph is available.
- Hat and mitten set: [Unsplash source page](https://unsplash.com/photos/a-baby-wearing-a-blue-knitted-hat-and-diaper-6WACFa0qy9s) (`product-hat-mittens.jpg`). The image shows a hat but does not show the included mittens; a set-specific photo is still needed.
- Swaddle: [Unsplash source page](https://unsplash.com/photos/a-newborn-baby-sleeps-peacefully-on-a-soft-blanket-NfE2M4Z9rME) (`product-swaddle.jpg`)
- Suction plate: [Unsplash source page](https://unsplash.com/photos/a-childs-plate-with-two-spoons-and-a-spoon-rest-on-a-stove-ioGJcLOoTPU) (`product-suction-plate.jpg`)
- Glass bottle set: [Unsplash source page](https://unsplash.com/photos/a-baby-bottle-sitting-next-to-a-cup-8yDbxoPySYM) (`product-glass-bottles.jpg`). This is a single bottle, not a glass bottle set; replace with a verified, accurate set photo before presenting it as an exact product image.
- Promotion mother and baby: [Unsplash source page](https://unsplash.com/photos/a-woman-holding-a-baby-wrapped-in-a-blanket-6GyuYSV6CIE) (`promo-blanket-baby.jpg`)
- Homepage garden hero: generated for this project (`hero-garden-children.png`); this is an AI-generated demo asset, with no third-party source or commercial rights claim.
- Reference-matched homepage garden hero: generated for this project (`hero-garden-reference.png`), showing two children playing with bubbles in a sunny garden; AI-generated demo image, with no third-party source or commercial rights claim.

## Typography and layout

- Headings: Nunito; body and interface: Inter, both with sensible fallbacks.
- Maintain a clear heading hierarchy and comfortable readable sizes.
- Limit content width to approximately 1280px, use generous whitespace, and base spacing on multiples of 4px.
- Use CSS Grid for product collections and flexible layouts for navigation and product information.
- Keep section spacing deliberate so the homepage feels polished without unnecessary length.

## Header and homepage

The shared header places the supplied, unmodified logo at a modest size on the left, a wide search link in the center, and account, wishlist, and shopping bag icons on the right. Do not add the separate “Everything Your Little One Needs” tagline beneath the logo. Category navigation sits below the header in one rounded cream container with pastel category icons. The header itself scrolls away; the category navigation becomes a compact sticky bar with a small supplied logo, a rounded search link immediately after it, and category links on the same row. Keep desktop links on one line. On mobile, keep the full search link below the logo/action row, retain the accessible menu toggle, and make the compact search and category strip usable without page overflow. The account glyph is presentational only; search, wishlist, and bag retain their existing destinations. Keep the peach shipping announcement slim, with shipping information centered and language/help text on the right. Do not add shopping behavior as part of visual work.

Use Nunito for rounded headings and Inter for interface and body copy. Keep the logo clear and proportionate; never recreate it with text. Keep the mobile menu accessible and prevent header controls from wrapping at narrow widths.

Preserve the existing homepage sections and develop them incrementally: announcement bar; header and navigation; hero; shop by category; new arrivals; best sellers; promotional collection; featured essentials; social gallery; footer. Do not build all sections in one task.

On the current homepage, use peach for the compact announcement, warm cream around the logo, and a full-width lifestyle photo carousel in the hero. Blend the left-side copy into the image with a soft warm-cream gradient and keep the children visible on the right at desktop sizes. The carousel rotates every five seconds, includes arrows, indicators, and a pause control, and disables automatic motion when reduced motion is preferred. Use playful pink, peach, sage, and lavender heading accents. A compact four-item benefits strip follows the hero with pastel icons and generous spacing. Use lavender for the Sleepy Time collection and white/warm cream to distinguish product sections. The existing photo-led Bento Grid remains the category treatment. Keep supplied product photos and image fallbacks; do not substitute unrelated imagery.

Decorative details should stay light and purposeful: small floating hearts, stars, clouds, and rainbow motifs may frame the hero; category and benefit icons can use soft pastel fills; and cards can use gentle gradients, organic corner shapes, and restrained shadows. Keep these details behind or around content, preserve readable contrast, and leave generous whitespace so the boutique feel stays polished rather than cluttered.

## Cards and controls

Category cards pair distinct photography with clear category names and counts. Product cards can show product photography, name, price, optional original price, sale or new badge, and wishlist control. Keep product information visible on mobile.

The homepage “Shop by category” section uses a photo-led Bento Grid: Baby Clothing is the featured tile, with the other six categories arranged as supporting tiles. Use consistent image crops, a restrained dark photo gradient behind white labels, and small palette-colored count pills for contrast. Keep the real category links, existing category data, and counts. At narrow mobile widths, the featured tile spans the grid and supporting tiles use two readable columns; tablet uses four columns, and wide desktop uses five columns to create a balanced two-row composition.

Use consistent primary, secondary, and text buttons. Provide subtle hover states, clear labels, visible focus states, comfortable touch targets, and accessible form controls.

## Responsive design and accessibility

- Support mobile from 320px, tablet from 768px, and desktop from 1024px.
- Use responsive CSS and prevent horizontal overflow.
- Use semantic HTML, descriptive alt text, keyboard-accessible controls, readable contrast, and proper form labels.
- Respect reduced-motion preferences.

## Design consistency

Use reusable components and design tokens. Avoid excessive shadows, animation, clutter, and unnecessary gradients. Keep the result photo-led, colorful, cohesive, and suitable for a premium baby store.
