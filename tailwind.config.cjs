/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                white: '#f5f2ff',
                'white-contrast': '#e8e6f2',
                black: '#1a1a1a',
            },
        },
    },
    plugins: [],
}
