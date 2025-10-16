'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React from 'react';

function SessionInfo() {
    const { data: session } = useSession();
    const t = useTranslations('Main');

    return (
        <p className="text-text-secondary">
            {session?.user
                ? t('session.user', { name: session.user?.name ?? 'User' })
                : t('session.noUser')}
        </p>
    );
}

export default SessionInfo;
