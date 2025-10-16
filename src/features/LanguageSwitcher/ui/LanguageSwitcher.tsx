'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Locales } from '@shared/config';
import { useLocale } from '@shared/lib';
import { DropDownContainer, ListDropDown, LabelChecked } from '@shared/ui';

interface IListProps {
    isOpen: boolean;
    setIsOpen: () => void;
}

export default function LanguageSwitcher({ isOpen, setIsOpen }: IListProps) {
    const { locale, toggleLocale } = useLocale();
    const t = useTranslations('LeftSidebar');

    const languagesList = [
        {
            title: t('language.title'),
            children: [
                {
                    label: (
                        <LabelChecked checked={locale === Locales.ENGLISH}>
                            {t('language.english')}
                        </LabelChecked>
                    ),
                    onClick: () => toggleLocale(Locales.ENGLISH),
                },
                {
                    label: (
                        <LabelChecked checked={locale === Locales.UKRAINIAN}>
                            {t('language.ukrainian')}
                        </LabelChecked>
                    ),
                    onClick: () => toggleLocale(Locales.UKRAINIAN),
                },
            ],
        },
    ];

    return (
        <DropDownContainer isOpen={isOpen} setIsOpen={setIsOpen} className="left-0 bottom-full">
            <ListDropDown list={languagesList} />
        </DropDownContainer>
    );
}
