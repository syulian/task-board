'use client';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';
import { FcGoogle } from 'react-icons/fc';

interface IGoogleButtonProps {
    children: ReactNode;
}

export default function GoogleButton({ children }: IGoogleButtonProps) {
    const t = useTranslations('LeftSidebar');

    return (
        <button
            type="button"
            className="flex justify-center items-center gap-4 cursor-pointer border border-bg-neutral-lighter bg-bg-secondary hover:bg-bg-primary rounded-md py-2"
            onClick={() => signIn('google')}
            aria-label={t('profile.signIn')}
        >
            <FcGoogle size={24} />
            {children}
        </button>
    );
}
