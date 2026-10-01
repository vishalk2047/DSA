/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        palette: {
          blue: '#0474C4',       // Primary vibrant blue
          steel: '#5379AE',      // Muted steel blue
          teal: '#2C444C',       // Deep slate teal
          light: '#A8C4EC',      // Soft pastel ice blue
          navy: '#06457F',       // Deep navy blue
          midnight: '#262B40',   // Midnight charcoal navy
        },
        brand: {
          50: '#f0f6fd',
          100: '#e1edf9',
          200: '#A8C4EC',        // Exact Palette #A8C4EC
          300: '#81a8de',
          400: '#5379AE',        // Exact Palette #5379AE
          500: '#0474C4',        // Exact Palette #0474C4 (Main Primary)
          600: '#0360a3',
          700: '#06457F',        // Exact Palette #06457F
          800: '#083864',
          900: '#2C444C',        // Exact Palette #2C444C
          950: '#262B40',        // Exact Palette #262B40
        },
        slate: {
          850: '#202538',
          900: '#262B40',        // Exact Palette #262B40
          950: '#1a1d2d',
        }
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(4, 116, 196, 0.04), 0 1px 2px 0 rgba(38, 43, 64, 0.03)',
        'card': '0 4px 12px -2px rgba(6, 69, 127, 0.08), 0 2px 6px -1px rgba(38, 43, 64, 0.04)',
        'card-hover': '0 12px 28px -6px rgba(4, 116, 196, 0.15), 0 8px 12px -4px rgba(38, 43, 64, 0.06)',
      }
    },
  },
  plugins: [],
}
