import type { Config } from 'tailwindcss';
import themeConfig from './src/assets/config/theme.json';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                xsm: '400px',
            },
            colors: {
                'primary-color': themeConfig.color.primary.base,
                'primary-color-light': themeConfig.color.primary.light,
                'secondary-color-light': themeConfig.color.secondary.light,
                'secondary-color': themeConfig.color.secondary.base,
                'secondary-color-dark': themeConfig.color.secondary.dark,
                'tertiary-color': themeConfig.color.tertiary.base,
                'tertiary-color-dark': themeConfig.color.tertiary.dark,
            },
            height: {
                dscreen: '100dvh', // Use 100dvh insteda of 100vh, so that it works on mobile.
            },
        },
    },
    plugins: [],
};
export default config;
