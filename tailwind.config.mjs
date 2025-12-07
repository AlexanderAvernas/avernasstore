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
    './src/app/**/*.{js,ts,jsx,tsx,css}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}