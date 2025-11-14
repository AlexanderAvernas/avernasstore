// tailwind.config.js
module.exports = {
    content: [
      './src/app/**/*.{js,ts,jsx,tsx,css}', // For Next.js 13+ app directory
      './src/components/**/*.{js,ts,jsx,tsx}', // For components directory
    ],
    theme: {
      extend: {
        fontFamily: {
        mono: ['var(--font-roboto-mono)', 'monospace'], // mono blir Roboto Mono
      },
      },
    },
    plugins: [],
  };
