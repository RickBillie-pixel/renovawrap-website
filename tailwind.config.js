/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6A4A34",
                "stitch-primary": "#C4A47C",
                secondary: "#D2C2AD",
                dark: "#1A1A1A",
                "background-light": "#FFF9F0",
                "background-dark": "#121212",
                "surface-dark": "#242424",
                "card-light": "#FFFFFF",
                "card-dark": "#1E1E1E",
                cream: "#FFF9F0",
                "muted-cream": "rgba(255, 249, 240, 0.7)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Playfair Display", "serif"],
            },
            borderRadius: {
                DEFAULT: "0px",
            },
            animation: {
                scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
            },
            keyframes: {
                scroll: {
                    to: {
                        transform: "translate(calc(-50% - 0.5rem))",
                    },
                },
            },
        },
    },
    plugins: [],
}
