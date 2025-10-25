/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    fontFamily: {
      sans: ['"IBM Plex Mono"', 'sans-serif'],
      mono: ['"Press Start 2P"', 'monospace'],
    },
    extend: {
      colors: {
        "purple-500": "#4824C8",
        "purple-400": "#938DFC",
        "purple-300": "#C4BCFF",
        "purple-200": "#E3DBFF",
        "purple-100": "#F4EFFF",
        "green-500": "#37C346",
        "green-400": "#8BE895",
        "green-200": "#CEF7D2",
        "green-300": "#AAE4B0",
        "green-100": "#ECFFEC",
        "grey-100": "#F1F1F1",
        "dark-700": "#423A44",
        "dark-900": "#131313",
        "orange-code": "#FF6600",
        "blue-code": "#00C8FF",
        "fuchsia-code": "#FF00EE",
        "white": "#FFFFFF"
      },
      boxShadow: {
        "button-dark": "4px 4px 0 0 rgba(196, 188, 255, 1)",
        "button-2-dark": "4px 4px 0 0 rgba(196, 188, 255, 0.5)" 
      }
    }
  },
  plugins: [],
}

