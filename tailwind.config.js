/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 时尚品牌配色
        cream: '#FAF8F5',
        sand: '#E8DED1',
        taupe: '#C9B8A8',
        charcoal: '#2C2C2C',
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        heading: ['var(--font-dm-sans)', 'DM Sans', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-ibm-mono)', 'IBM Plex Mono', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
