const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: {
        '@tailwindcss/postcss': {},
    },
    theme: {
        extend: {
            colors: {
                bg: {
                    primary: 'var(--color-bg-primary)',
                    secondary: 'var(--color-bg-secondary)',
                    neutral: 'var(--color-bg-neutral)',
                    neutralLighter: 'var(--color-bg-neutral-lighter)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    neutral: 'var(--color-text-neutral)',
                },
            },
        },
    },
};

export default config;
