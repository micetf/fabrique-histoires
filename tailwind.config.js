/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            animation: {
                "spin-slow": "spin 3s linear infinite",
                "flip-in": "pageFlip 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
            },
            keyframes: {
                pageFlip: {
                    "0%": {
                        transform: "perspective(800px) rotateY(-90deg)",
                        transformOrigin: "left center",
                        opacity: "0",
                    },
                    "50%": {
                        transform: "perspective(800px) rotateY(-45deg)",
                        transformOrigin: "left center",
                    },
                    "100%": {
                        transform: "perspective(800px) rotateY(0deg)",
                        transformOrigin: "left center",
                        opacity: "1",
                    },
                },
            },
            fontFamily: {
                comic: ["Comic Neue", "Comic Sans MS", "cursive"],
            },
        },
    },
    plugins: [],
};
