const flowbite = require('flowbite-react/tailwind');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        slab: ['Roboto Slab', 'serif'],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
