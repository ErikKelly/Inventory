import type { Config } from "tailwindcss";
const { PRIMARY_COLOR } = require('./src/config/siteConfig');

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'nav-bg': PRIMARY_COLOR,
      },
    },
  },
  plugins: [],
} satisfies Config;
