/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    './docs/.vitepress/**/*.{js,ts,vue}',
    './docs/**/*.{js,ts,vue,md}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
