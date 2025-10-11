'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Locales } from '@shared/config';
import { isEnumItem } from '@shared/lib/isFunctions/isEnumItem/isEnumItem';

const useLocale = () => {
    const [locale, setLocale] = useState<Locales>(Locales.ENGLISH);
    const router = useRouter();

    const toggleLocale = (newLocale: Locales) => {
        setLocale(newLocale);
        document.cookie = `lang=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
        router.refresh();
    };

    useEffect(() => {
        const match = document.cookie.split(`; `).find(r => r.startsWith('lang='));

        if (match) {
            const value = match.split('=')[1];
            if (isEnumItem(Locales, value)) setLocale(value);
        }
    }, []);

    return {
        locale,
        toggleLocale,
    };
};

export default useLocale;
