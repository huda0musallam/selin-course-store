// main.js — the starting point for every page.
// It restores the saved cart, updates the header badge, then starts
// only the code for the page we are on (read from <body data-page="...">).

import { loadCart } from "./cart.js";
import { getCurrentPage, renderCartBadge } from "./dom.js";
import { initHomePage } from "./pages/home.js";
import { initCartPage } from "./pages/cart-page.js";

loadCart();
renderCartBadge();

const currentPage = getCurrentPage();

if (currentPage === "home") {
  initHomePage();
} else if (currentPage === "cart") {
  initCartPage();
}
