import type { Config } from "tailwindcss";
import * as tailwindAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "#84cc16",
					foreground: "#0f172a",
				},
				secondary: {
					DEFAULT: "#eab308",
					foreground: "#0f172a",
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
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				gradient: "gradient 15s ease infinite",
				float: "float 1s ease-in-out infinite",
			},
			keyframes: {
				gradient: {
					"0%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
					"100%": { backgroundPosition: "0% 50%" },
				},
				float: {
					"0%": { transform: "translate(0, 0)" },
					"50%": { transform: "translate(20px, 20px)" },
					"100%": { transform: "translate(0, 0)" },
				},
			},
			backgroundImage: {
				"gradient-animated":
					"linear-gradient(-45deg, #022c22, #064e3bd3, #065f4688, #0478573b)",
			},
			backgroundSize: {
				"400": "400% 400%",
			},
		},
	},
	plugins: [tailwindAnimate],
} satisfies Config;
