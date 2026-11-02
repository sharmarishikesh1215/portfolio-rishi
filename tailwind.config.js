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
        apple: {
          light: {
            bg: '#FFFFFF',
            primary: '#1D1D1F',
            secondary: '#6E6E73',
            accent: '#0071E3',
            accentHover: '#0077ED',
            surface: '#F5F5F7',
            surfaceHover: '#E8E8ED',
            border: '#E5E5E7',
          },
          dark: {
            bg: '#000000',
            primary: '#F5F5F7',
            secondary: '#A1A1A6',
            accent: '#2997FF',
            accentHover: '#47A7FF',
            surface: '#161617',
            surfaceHover: '#222224',
            border: '#2D2D2E',
          },
          gray: {
            50: '#FBFBFD',
            100: '#F5F5F7',
            200: '#E5E5E7',
            300: '#D2D2D7',
            400: '#86868B',
            500: '#6E6E73',
            600: '#424245',
            700: '#333336',
            800: '#1D1D1F',
            900: '#161617',
            950: '#000000',
          },
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          '"Segoe UI"',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Courier New"',
          'monospace',
        ],
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        normal: '-0.01em',
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'apple-md': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'apple-lg': '0 12px 36px rgba(0, 0, 0, 0.12)',
        'apple-card': '0 20px 40px -15px rgba(0, 0, 0, 0.07)',
        'apple-dark-card': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'apple': '20px',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

