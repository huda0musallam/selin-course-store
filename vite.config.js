import { defineConfig } from 'vite';

// The store has two HTML pages. Vite needs to know about both so that
// `npm run build` creates index.html AND cart.html inside dist/.
export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: 'index.html',
        cart: 'cart.html',
        contact: 'contact.html',
      },
    },
  },
});
