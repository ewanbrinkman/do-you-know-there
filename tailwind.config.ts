import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-color': '#baffe6',
                'primary-color-light': '#edfff8',
                'secondary-color': '#005234',
                'secondary-color-dark': '#003622',
                'tertiary-color': '#3b82f6',
                'tertiary-color-dark': '#1d4ed8',
            },
            height: {
                dscreen: '100dvh'
            }
        },
    },
    plugins: [],
};
export default config;
