import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';
import { ThemeSwitcher, LanguageSwitcher } from '@features/Switcher';
import { createStateController } from '@shared/lib';
import { DropDownContainer, ListDropDown } from '@shared/ui';

function Settings() {
    const [isOpen, setIsOpen] = useState({
        settings: false,
        themes: false,
        languages: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);
    const t = useTranslations('LeftSidebar');

    const dropDownList = [
        {
            children: [
                {
                    label: t('settings.about'),
                    onClick: () => {},
                },
                {
                    label: t('settings.feedback'),
                    onClick: () => {},
                },
            ],
        },
        {
            children: [
                {
                    label: t('settings.view'),
                    onClick: () => {
                        setIsOpenField('settings', false);
                        setIsOpenField('themes', true);
                    },
                },
                {
                    label: t('settings.language'),
                    onClick: () => {
                        setIsOpenField('settings', false);
                        setIsOpenField('languages', true);
                    },
                },
            ],
        },
        {
            children: [
                {
                    label: t('settings.releaseNotes'),
                    onClick: () => {},
                },
            ],
        },
    ];

    return (
        <div className="relative w-full bg-bg-secondary">
            <button
                className="flex items-center gap-1.5 py-1.5 px-4 w-full text-left font-bold cursor-pointer rounded-lg"
                onClick={() => setIsOpenField('settings', true)}
                aria-label={t('settings.title')}
            >
                <HiOutlineCog8Tooth className="min-w-6 min-h-6" />
                <p>{t('settings.title')}</p>
            </button>
            <DropDownContainer
                isOpen={isOpen.settings}
                setIsOpen={() => setIsOpenField('settings', false)}
                className="left-0 bottom-full"
            >
                <ListDropDown list={dropDownList} />
            </DropDownContainer>
            <ThemeSwitcher
                isOpen={isOpen.themes}
                setIsOpen={() => setIsOpenField('themes', false)}
            />
            <LanguageSwitcher
                isOpen={isOpen.languages}
                setIsOpen={() => setIsOpenField('languages', false)}
            />
        </div>
    );
}

export default Settings;
