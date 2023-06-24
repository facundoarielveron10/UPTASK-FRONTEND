/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['index.html', './src/**/*.jsx'],
    theme: {
        extend: {},
        screens: {
            cel: '450px',
            // => @media (min-width: 640px) { ... }

            sm: '640px',
            // => @media (min-width: 640px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            '2md': '900px',
            // => @media (min-width: 900px) { ... }

            lg: '1024px',
            // => @media (min-width: 1024px) { ... }

            xl: '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1650px',
            // => @media (min-width: 1650px) { ... }
        },
    },
    plugins: [],
};
