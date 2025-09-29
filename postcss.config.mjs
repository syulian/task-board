const config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    plugins: ['@tailwindcss/postcss'],
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
                },
            },
        },
    },
};

export default config;
