'use client';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { isEnumItem, LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '@shared/lib';

interface IThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(Theme.SYSTEM);

    useEffect(() => {
        const localStorageTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        if (!localStorageTheme || !isEnumItem(Theme, localStorageTheme)) return;

        setTheme(localStorageTheme);
    }, []);

    useEffect(() => {
        let appliedTheme = theme;

        if (theme === Theme.SYSTEM) {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            appliedTheme = isDark ? Theme.DARK : Theme.LIGHT;
        }

        document.body.dataset.theme = appliedTheme;
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
