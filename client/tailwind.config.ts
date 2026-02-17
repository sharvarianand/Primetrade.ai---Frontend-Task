import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: {
          DEFAULT: 'rgb(var(--border))',
          50: 'rgb(var(--border) / 0.05)',
          100: 'rgb(var(--border) / 0.1)',
          200: 'rgb(var(--border) / 0.2)',
          300: 'rgb(var(--border) / 0.3)',
          400: 'rgb(var(--border) / 0.4)',
          500: 'rgb(var(--border) / 0.5)',
          600: 'rgb(var(--border) / 0.6)',
          700: 'rgb(var(--border) / 0.7)',
          800: 'rgb(var(--border) / 0.8)',
          900: 'rgb(var(--border) / 0.9)',
          950: 'rgb(var(--border))',
        },
        input: 'rgb(var(--input))',
        ring: 'rgb(var(--ring))',
        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        primary: {
          DEFAULT: 'rgb(var(--primary))',
          foreground: 'rgb(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'rgb(var(--secondary))',
          foreground: 'rgb(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'rgb(var(--destructive))',
          foreground: 'rgb(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'rgb(var(--muted))',
          foreground: 'rgb(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent))',
          foreground: 'rgb(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'rgb(var(--popover))',
          foreground: 'rgb(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'rgb(var(--card))',
          foreground: 'rgb(var(--card-foreground))',
        },
        surface: {
          DEFAULT: 'rgb(var(--surface))',
        },
        text: {
          primary: 'rgb(var(--text-primary))',
          secondary: 'rgb(var(--text-secondary))',
          muted: 'rgb(var(--text-muted))',
        },
        success: {
          DEFAULT: '#22c55e',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#eab308',
          foreground: '#ffffff',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        geist: ['var(--font-geist)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #000000 0%, #4b5563 50%, #6b7280 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #d1d5db 0%, #6b7280 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(0,0%,4%,1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(0,0%,15%,1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(0,0%,10%,1) 0, transparent 50%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out 0.15s forwards',
        'fade-up': 'fade-up 0.8s ease-out 0.4s forwards',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' },
        },
        gradientX: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        gradientY: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center bottom',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 0, 0, 0.15), 0 0 20px rgba(0, 0, 0, 0.08)',
        'glow-md': '0 0 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(0, 0, 0, 0.1)',
        'glow-lg': '0 0 30px rgba(0, 0, 0, 0.25), 0 0 60px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
export default config
