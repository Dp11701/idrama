import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      xs: "376px",
      sm: "568px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      xxl: "1920px",
    },
    fontSize: {
      xs: ["12px", "18px"],
      sm: ["14px", "22px"],
      base: ["16px", "24px"],
      lg: ["18px", "22px"],
      xl: ["20px", "28px"],
      "2xl": ["24px", "32px"],
      "3xl": ["40px", "36px"],
    },
    fontFamily: {
      sans: ["Manrope", "sans-serif"],
    },
    extend: {
      screens: {
        "2xl": "1652px",
        "3xl": "1921px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        brand: {
          "secondary-600": "var(--semantic-brand-secondary-600)",
          "primary-800": "var(--semantic-brand-800)",
          "primary-700": "var(--semantic-brand-700)",
          "primary-600": "var(--semantic-brand-600)",
          "primary-200": "var(--semantic-brand-200)",
          "primary-50": "var(--semantic-brand-50)",
        },
        sky: {
          "primary-700": "var(--semantic-sky-700)",
          "primary-200": "var(--semantic-sky-200)",
          "primary-50": "var(--semantic-sky-50)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        typo: {
          "heading-primary": "var(--semantic-text-heading-primary)",
          "error-primary": "var(--semantic-text-error-primary)",
          "heading-secondary": "var(--semantic-text-heading-secondary)",
          "sub-headline-brand": "var(--semantic-text-sub-headline-brand)",
          body: "var(--semantic-text-body)",
          placeholder: "var(--semantic-text-placeholder)",
        },
        "semantic-border-primary": "var(--semantic-border-primary)",
        "semantic-border-secondary": "var(--semantic-border-secondary)",
        "semantic-border-tertiary": "var(--semantic-border-border-tertiary)",
        "semantic-fg-button-link01": "var(--semantic-fg-button-link01)",
        "semantic-fg-button-link02": "var(--semantic-fg-button-link02)",
        "semantic-text-heading-primary": "var(--semantic-text-heading-primary)",
        "semantic-border-border-secondary":
          "var(--semantic-border-border-secondary)",
        "semantic-success-700": "var(--semantic-success-700)",
        "semantic-success-500": "var(--semantic-success-500)",
        "semantic-success-200": "var(--semantic-success-200)",
        "semantic-success-50": "var(--semantic-success-50)",
        "semantic-warning-700": "var(--semantic-warning-700)",
        "semantic-warning-200": "var(--semantic-warning-200)",
        "semantic-warning-50": "var(--semantic-warning-50)",
        "semantic-error-700": "var(--semantic-error-700)",
        "semantic-error-200": "var(--semantic-error-200)",
        "semantic-error-50": "var(--semantic-error-50)",
        "semantic-background-bg-secondary":
          "var(--semantic-background-bg-secondary)",
        "semantic-text-placeholder": "var(--semantic-text-placeholder)",
        "c-bg-canvas": "var(--c-bg-canvas)",
        "c-bg-element-normal": "var(--c-bg-element-normal)",
        "c-bg-element-light": "var(--c-bg-element-light)",
        "c-bg-element-disable": "var(--c-bg-element-disable)",
        "c-bg-overlay": "var(--c-bg-overlay)",
        "c-bg-4-rest": "var(--c-bg-4-rest)",
        "c-brand-bg-tint": "var(--c-brand-bg-tint)",
        "c-fg-main": "var(--c-fg-main)",
        "c-fg-sub": "var(--c-fg-sub)",
        "c-fg-disable": "var(--c-fg-disable)",
        "c-fg-3-rest": "var(--c-fg-3-rest)",
        "c-fg-main-on-overlay": "var(--c-fg-main-on-overlay)",
        "c-fg-sub-on-overlay": "var(--c-fg-sub-on-overlay)",
        "c-brand-fg-on-tint": "var(--c-brand-fg-on-tint)",
        "c-stroke-accessible": "var(--c-stroke-accessible)",
        "c-stroke-2-rest": "var(--c-stroke-2-rest)",
        "c-stroke-press": "var(--c-stroke-press)",
        "c-stroke-disable": "var(--c-stroke-disable)",
        "c-status-err-on-tint": "var(--c-status-err-on-tint)",
        "c-status-err-bg-tint": "var(--c-status-err-bg-tint)",
        "c-status-success-background": "var(--c-status-success-background)",
        "c-status-success-foreground": "var(--c-status-success-foreground)",
        "c-status-warning-bg-tint": "var(--c-status-warning-bg-tint)",
        "c-status-warning-on-tint": "var(--c-status-warning-on-tint)",
        "c-status-danger-foreground-2": "var(--c-status-danger-foreground-2)",
        "c-fg-rest": "var(--c-fg-rest)",
        "c-bg-useful": "var(--c-bg-useful)",
        "c-status-useful": "var(--c-status-useful)",
        "c-bg-sec-tint": "var(--c-bg-sec-tint)",
        "c-bg-2-rest": "var(--c-bg-2-rest)",
        "c-bg-canvas-rest": "var(--c-bg-canvas-rest)",
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
      boxShadow: {
        xs: "0px 1px 2px 0px rgba(18, 26, 43, 0.05);",
        sm: "0px 1px 2px 0px rgba(18, 26, 43, 0.10), 0px 1px 2px -1px rgba(18, 26, 43, 0.06)",
        md: "0px 4px 6px -2px rgba(18, 26, 43, 0.10), 0px 2px 4px -2px rgba(18, 26, 43, 0.06)",
        xl: "0px 20px 25px -4px rgba(18, 26, 43, 0.10), 0px 8px 8px -6px rgba(18, 26, 43, 0.04)",
        "light-low":
          "0px 0px 2px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.14)",
        "light-Shadow-mid-high":
          "0px 8px 16px 0px rgba(0, 0, 0, 0.14), 0px 0px 2px 0px rgba(0, 0, 0, 0.12);",
        "light-shadow-08":
          "0px 4px 8px 0px rgba(0, 0, 0, 0.14), 0px 0px 2px 0px rgba(0, 0, 0, 0.12);",
        "light-shadow-64":
          "0px 32px 64px 0px rgba(0, 0, 0, 0.24), 0px 0px 8px 0px rgba(0, 0, 0, 0.20);",
        dowww: "0px 4px 48px 0px rgba(18, 27, 44, 0.15);",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  future: {
    hoverOnlyWhenSupported: true,
  },
} satisfies Config;

export default config;
