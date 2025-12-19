import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  	extend: {
  		colors: {
        'ci-yellow': '#F3DC36',
        'ci-blue': '#5666A2',
        'accent-blue': '#3b82f6', // Kept for links if needed
        'dark-gray': '#1f2937', // Anthracite
        'medium-gray': '#6b7280',
        'light-gray': '#f3f4f6',
        'primary-dark-gray': '#464648',
  			border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))",
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))",
  			},
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))",
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))",
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))",
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))",
  			},
  		},
  		borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
  		boxShadow: {
        'light': '0 4px 12px rgba(0,0,0,0.08)',
        'deep': '0 8px 24px rgba(0,0,0,0.12)',
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
