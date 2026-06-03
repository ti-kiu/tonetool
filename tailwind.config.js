/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#08080F',
        surface: '#0F0F1A',
        primary: '#00E5CC',
        cta: '#FFBF00',
        'text-primary': '#E8ECF0',
        'text-secondary': '#6B7280',
        border: '#1E1E2E',
      },
      fontFamily: {
        heading: ["'Space Grotesk'", 'sans-serif'],
        body: ["'DM Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
    },
  },
  plugins: [],
};
