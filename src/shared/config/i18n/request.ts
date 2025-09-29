import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { isEnumItem } from '@shared/lib';
import { Locales } from './locales';

export default getRequestConfig(async () => {
    const store = await cookies();
    let locale = store.get('lang')?.value || 'en';

    if (!isEnumItem(Locales, locale)) locale = 'en';

    return {
        locale,
        messages: (await import(`./messages/${locale}.json`)).default,
    };
});
