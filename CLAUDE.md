# Selin Baby Store — Project Instructions

## Project Overview

Selin is an interactive e-commerce store for baby and children's essentials.

The store includes baby clothing, newborn essentials, feeding products, bath and care products, sleep products, toys, and accessories.

Preserve Selin's brand identity, product data, images, colors, and visual design.

## Technology Stack

- HTML
- CSS
- Vanilla JavaScript
- JavaScript ES Modules using import and export
- Vite development environment

## Project Rules

1. Use semantic HTML: header, nav, main, section, article, and footer. Use one h1 per page.
2. Use `<button>` for actions and `<a href>` for navigation. Never use a clickable div.
3. Every input must have an associated label.
4. Use mobile-first CSS with min-width media queries. Avoid !important.
5. Use `===`, `const` by default, `let` only when reassignment is needed. Never use `var`.
6. Avoid magic numbers. Give important values meaningful names.
7. Reuse existing functions and avoid duplicated logic.
8. Explain every new file and function in simple language.
9. Do not change anything unrelated to the requested task.
10. Products must be rendered dynamically from `src/data/products.js`. Never hardcode product cards in HTML.
11. Organize JavaScript into modules, with one clear responsibility per file.
12. Only `src/dom.js` can directly access or modify the DOM.
13. Search, category filtering, and sorting must work together correctly.
14. Default sorting must restore the original product order.
15. Cart quantities, item count, and total must always be accurate.
16. Save cart data in localStorage and restore it after refreshing the page.
17. One click must trigger one action. Avoid duplicated event listeners.

## Design Rules

Follow the existing Selin visual identity and design reference.

The store should be elegant, warm, modern, clean, and child-friendly.

Prioritize product photography, clear navigation, responsive layouts, and usability.

## Project Safety

1. Do not delete existing images or unrelated files.
2. Do not overwrite existing files without explaining the change and getting approval.
3. Never commit or push without permission.

## Development Workflow

1. Inspect the existing environment before making changes.
2. Explain the proposed plan and affected files before implementation.
3. Work in small, clearly defined stages.
4. Implement only the currently approved stage.
5. Test each stage before proceeding.
6. Explain what changed, where, and why.
7. Wait for approval before starting the next major stage.
8. Never claim tests passed unless they were actually run.

## Debugging Rules

1. Investigate errors using the browser Console and breakpoints before suggesting a fix.
2. Explain the cause of every bug, not just the solution.
3. Record bugs and their fixes in `debugging-log.md`.

## Communication

Explain technical concepts in simple language, assuming the user is learning HTML, CSS, and JavaScript.

Walk through code file by file after every change.

Do not implement the entire store in one task.
