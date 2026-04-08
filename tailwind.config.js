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
                secondary: "#D2C2AD",
                dark: "#1A1A1A",
                "background-light": "#FFF9F0",
                "background-dark": "#121212",
                "card-light": "#FFFFFF",
                "card-dark": "#1E1E1E",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Playfair Display", "serif"],
            },
            borderRadius: {
                DEFAULT: "0px",
            },
        },
    },
    plugins: [],
}
