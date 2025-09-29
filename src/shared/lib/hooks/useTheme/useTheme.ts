import { LOCAL_STORAGE_THEME_KEY, Theme, useThemeContext } from '@shared/lib/theme/ThemeContext';

const useTheme = () => {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toggleTheme,
    };
};

export default useTheme;
