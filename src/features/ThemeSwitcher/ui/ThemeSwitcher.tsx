'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Theme, useTheme } from '@shared/lib';
import { DropDownContainer, ListDropDown, LabelChecked } from '@shared/ui';

interface IListProps {
    isOpen: boolean;
    setIsOpen: () => void;
}

export default function ThemeSwitcher({ isOpen, setIsOpen }: IListProps) {
    const { theme, toggleTheme } = useTheme();
    const t = useTranslations('LeftSidebar');

    const themesList = [
        {
            title: t('theme'),
            children: [
                {
                    label: (
                        <LabelChecked checked={theme === Theme.LIGHT}>
                            {t('themes.light')}
                        </LabelChecked>
                    ),
                    onClick: () => toggleTheme(Theme.LIGHT),
                },
                {
                    label: (
                        <LabelChecked checked={theme === Theme.DARK}>
                            {t('themes.dark')}
                        </LabelChecked>
                    ),
                    onClick: () => toggleTheme(Theme.DARK),
                },
                {
                    label: (
                        <LabelChecked checked={theme === Theme.SYSTEM}>
                            {t('themes.system')}
                        </LabelChecked>
                    ),
                    onClick: () => toggleTheme(Theme.SYSTEM),
                },
            ],
        },
    ];

    return (
        <DropDownContainer isOpen={isOpen} setIsOpen={setIsOpen} className="left-0 bottom-full">
            <ListDropDown list={themesList} />
        </DropDownContainer>
    );
}
