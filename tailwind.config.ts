import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        playfair: ["Playfair Display", "serif"],
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        legal: {
          primary: "#7A0A0A",
          secondary: "#8C1B1B",
          accent: "#E63946",
          dark: "#1A0000",
          light: "#F9E5E5",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        chart: {
          '1': "hsl(var(--chart-1))",
          '2': "hsl(var(--chart-2))",
          '3': "hsl(var(--chart-3))",
          '4': "hsl(var(--chart-4))",
          '5': "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-delay": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "fall-leaf": {
          "0%": {
            transform: "translateY(0) rotate(0deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) rotate(360deg)",
            opacity: "0.3",
          },
        },
        "turkey-walk": {
          "0%": {
            transform: "translateX(-100px)",
          },
          "100%": {
            transform: "translateX(100vw)",
          },
        },
        "confetti-burst": {
          "0%": {
            transform: "translateY(0) scale(0) rotate(0deg)",
            opacity: "1",
          },
          "50%": {
            transform: "translateY(50vh) scale(1) rotate(180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(100vh) scale(0.5) rotate(360deg)",
            opacity: "0",
          },
        },
        "slide-up-banner": {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        "scroll-feast": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-delay": "float-delay 5s ease-in-out infinite 1s",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "fall-leaf": "fall-leaf 10s linear infinite",
        "turkey-walk": "turkey-walk 20s linear infinite",
        "confetti-burst": "confetti-burst 2.5s ease-out forwards",
        "slide-up-banner": "slide-up-banner 0.8s ease-out forwards",
        "scroll-feast": "scroll-feast 20s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;

export default config;
