# Debugging Log — Selin Baby Store

Each entry records what was wrong, why it happened, and how it was fixed.

## 2026-10-31 — Found while building the product display and Cart page

### 1. Search, category, and sort controls did nothing
- **Symptom:** Typing in the search box or changing a dropdown did not change the product list.
- **Cause:** `src/filters.js` had working functions, but nothing listened to the controls or called those functions.
- **Fix:** `setupFilterEvents()` in `src/dom.js` sends all three values whenever any control changes. `getVisibleProducts()` in `src/pages/home.js` runs search → category → sort, always starting from the original list, so "Default" restores the original order.

### 2. "Clear cart" button did nothing
- **Symptom:** Clicking "Clear cart" left the items in the cart.
- **Cause:** `clearCart()` existed in `src/cart.js`, but no click listener was connected to the button.
- **Fix:** `setupCartEvents()` now listens to `#clear-cart` and calls `onClear`, which runs `clearCart()` and redraws the page.

### 3. Prices showed without dollars and cents
- **Symptom:** Product cards showed `34` instead of `$34.00`; cart rows could show `$40` or long decimals.
- **Cause:** The raw number was put into the HTML without formatting.
- **Fix:** New `formatPrice()` in `src/format.js` is used for every price.

### 4. Product cards showed the category id ("bath-care") instead of its name
- **Cause:** The card used `product.categoryId` directly.
- **Fix:** New `getCategoryName()` in `src/data/categories.js` looks up the display name.

### 5. The `hidden` attribute could be ignored
- **Symptom:** An element with `hidden` could still appear if a CSS class gave it `display: grid` or `display: flex`.
- **Cause:** `[hidden]` and a single class have the same CSS specificity, so the rule written later in the file wins.
- **Fix:** Changed the rule to `html [hidden]`, which is slightly more specific, without needing `!important`.

### 6. Carts saved before product images were added had no images
- **Cause:** Each cart item was a full copy of the product at the moment it was added, so older saved copies had no `image` field.
- **Fix:** `loadCart()` now keeps only the `id` and `quantity` from storage and takes the latest details from `products.js`. It also drops ids that no longer exist and recovers from damaged saved data.
