// Formatting helpers: turn raw values into text that people read on the page.

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Turns a number like 20 into "$20.00".
export function formatPrice(amount) {
  return priceFormatter.format(amount);
}
