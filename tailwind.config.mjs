// // tailwind.config.js
// module.exports = {
//     content: [
//       './src/app/**/*.{js,ts,jsx,tsx,css}', // For Next.js 13+ app directory
//       './src/components/**/*.{js,ts,jsx,tsx}', // For components directory
//     ],
//     theme: {
//       extend: {
//         fontFamily: {
//         sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
//       },
//       },
//     },
//     plugins: [],
//   };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,css}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#272525",
          red: {
      50: '#A32323',
      100: '#A32323',
      200: '#A32323',
      300: '#A32323',
      400: '#A32323',
      500: '#A32323',
      600: '#A32323',
      700: '#A32323',
      800: '#A32323',
      900: '#A32323',
    },
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
