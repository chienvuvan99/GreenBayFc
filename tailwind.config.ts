import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#0EA5E9",
          foreground: "hsl(var(--primary-foreground))",
        },
        woodsmoke: {
          "50": "#f5f5f6",
          "100": "#e5e5e8",
          "200": "#cfd0d2",
          "300": "#adafb3",
          "400": "#83848d",
          "500": "#686972",
          "600": "#595961",
          "700": "#4c4d52",
          "800": "#434347",
          "900": "#3b3b3e",
          "950": "#1b1b1d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
