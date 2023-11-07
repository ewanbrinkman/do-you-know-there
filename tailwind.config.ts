import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            // fontSize: {
            //     // 'text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'
            //     'title': ['4.125rem', {lineHeight: '1.25'}],
            // },
            colors: {
                'primary-color': '#baffe6',
                'secondary-color': '#005234',
                'secondary-color-dark': '#003622',
            }
        },
    },
    plugins: [],
};
export default config;
