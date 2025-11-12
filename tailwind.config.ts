import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "asgard-gold": "#c9a536",
        "asgard-green": "#1d5c43",
        "fenrir-ice": "#9fd4ff",
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        aurora: "radial-gradient(circle at 20% 20%, rgba(144,238,144,0.25), transparent 60%), radial-gradient(circle at 80% 30%, rgba(173,216,230,0.2), transparent 55%)",
      },
    },
  },
  plugins: [],
};

export default config;
