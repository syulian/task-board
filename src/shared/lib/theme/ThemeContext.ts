'use client';
import { createContext, useContext } from 'react';

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
}

export const LOCAL_STORAGE_THEME_KEY = 'theme';

export interface IThemeContextProps {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContextProps | null>(null);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useThemeContext must be used within a Provider');

    return context;
};
