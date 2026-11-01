# Debugging Log — Selin Baby Store

Each entry records what was wrong, why it happened, how it was discovered, and how it was fixed.

## 2026-10-31 — Product Display and Cart Development

### Bug 1: Search, category, and sort controls did nothing

- **What I saw:** Typing in the search box or changing a dropdown did not update the product list.
- **Type:** Logic
- **How I found it:** Tested the search, category, and sort controls in the browser.
- **Cause:** `src/filters.js` had working functions, but nothing listened to the controls or called those functions.
- **Fix:** `setupFilterEvents()` in `src/dom.js` connects all three controls. `getVisibleProducts()` in `src/pages/home.js` applies search → category → sort, starting from the original product list. This also allows Default sorting to restore the original order.
- **Did I use AI? For what?** Yes. I used AI to understand the event handling and filter integration.

### Bug 2: "Clear cart" button did nothing

- **What I saw:** Clicking "Clear cart" left the items in the cart.
- **Type:** Logic
- **How I found it:** Clicked the Clear cart button and checked the cart contents.
- **Cause:** `clearCart()` existed in `src/cart.js`, but no click listener was connected to the button.
- **Fix:** `setupCartEvents()` in `src/dom.js` listens to `#clear-cart` and calls `onClear`, which runs `clearCart()` and redraws the page.
- **Did I use AI? For what?** No. I discovered and investigated this issue myself by testing the button and checking its behavior.

### Bug 3: Prices showed without dollars and cents

- **What I saw:** Product cards showed `$34` instead of `$34.00`; cart rows could show `$40` or long decimals.
- **Type:** Logic
- **How I found it:** Inspected product prices and cart totals in the browser.
- **Cause:** Raw numbers were displayed without formatting.
- **Fix:** Added `formatPrice()` in `src/format.js` and used it wherever prices are displayed.
- **Did I use AI? For what?** Yes. I used AI to understand number formatting and create a reusable formatting function.

### Bug 4: Product cards showed the category ID instead of its name

- **What I saw:** Product cards displayed "bath-care" instead of the category name.
- **Type:** Logic
- **How I found it:** Checked the category labels on product cards.
- **Cause:** The card used `product.categoryId` directly.
- **Fix:** Added `getCategoryName()` in `src/data/categories.js` to look up the display name.
- **Did I use AI? For what?** Yes. I used AI to understand how to retrieve category display names from the category data.

### Bug 5: The `hidden` attribute could be ignored

- **What I saw:** An element with the `hidden` attribute could still appear when a CSS class applied `display: grid` or `display: flex`.
- **Type:** Logic (CSS specificity)
- **How I found it:** Inspected the element's visibility in the browser and checked the CSS rules.
- **Cause:** The `[hidden]` selector and a single class selector had the same specificity, so the later CSS rule could override it.
- **Fix:** Changed the selector to `html [hidden]`, which has higher specificity without using `!important`.
- **Did I use AI? For what?** No. I investigated the CSS behavior myself, identified the specificity issue, and fixed the selector.

### Bug 6: Old cart items had no product images

- **What I saw:** Cart items saved before product images were added did not display images.
- **Type:** State
- **How I found it:** Opened the cart after restoring previously saved cart data.
- **Cause:** Each cart item was stored as a full copy of the product at the time it was added. Older saved copies did not contain the `image` field.
- **Fix:** `loadCart()` now keeps only the product `id` and `quantity` from storage and retrieves the latest product details from `products.js`. It also removes IDs that no longer exist and handles damaged saved data.
- **Did I use AI? For what?** No. I discovered the issue by checking the restored cart data and investigated the cause and fix myself.
