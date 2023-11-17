/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black1: 'var(--black1)',
        black2: 'var(--black2)',
        black3: 'var(--black3)',
        black4: 'var(--black4)',
        black5: 'var(--black5)',
        black6: 'var(--black6)',
        white: 'var(--white)',
        background: 'var(--background)',
        pink_bg: 'var(--pink_bg)',
      },
    },
  },
  plugins: [],
}

