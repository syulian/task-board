'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi2';
import { SignInPopup, SignUpPopup } from '@entities/User';
import { createStateController } from '@shared/lib';
import { NavButton, Popup, Tooltip } from '@shared/ui';

interface IAuthProps {
    isExpanded: boolean;
}

export default function Auth({ isExpanded }: IAuthProps) {
    const [isOpen, setIsOpen] = useState({
        signIn: false,
        signUp: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const { data: session } = useSession();
    const router = useRouter();

    const t = useTranslations('LeftSidebar');

    const openSignUp = () => {
        setIsOpenField('signIn', false);
        setIsOpenField('signUp', true);
    };

    const openSignIn = () => {
        setIsOpenField('signUp', false);
        setIsOpenField('signIn', true);
    };

    return (
        <>
            {session?.user ? (
                <Tooltip text={t('profile.signOut')} isExpanded={isExpanded}>
                    <NavButton
                        onClick={async () => {
                            await signOut({ redirect: false });
                            router.push('/');
                        }}
                    >
                        {session.user.image ? (
                            <Image
                                alt={session.user.email!}
                                src={session.user.image}
                                width={24}
                                height={24}
                                className="rounded-full"
                                priority
                            />
                        ) : (
                            <span className="flex justify-center items-center min-h-6 min-w-6 rounded-full bg-bg-secondary outline outline-bg-neutral-lighter text-sm">
                                {session.user.name![0]}
                            </span>
                        )}
                        {isExpanded && <p>{t('profile.signOut')}</p>}
                    </NavButton>
                </Tooltip>
            ) : (
                <Tooltip text={t('profile.signIn')} isExpanded={isExpanded}>
                    <NavButton onClick={() => setIsOpenField('signIn', true)}>
                        <HiOutlineUserCircle className="min-w-6 min-h-6" />
                        {isExpanded && <p>{t('profile.signIn')}</p>}
                    </NavButton>
                </Tooltip>
            )}
            <Popup isOpen={isOpen.signIn} setIsOpen={() => setIsOpenField('signIn', false)}>
                <SignInPopup
                    openSignUp={openSignUp}
                    setIsOpen={() => setIsOpenField('signIn', false)}
                />
            </Popup>
            <Popup isOpen={isOpen.signUp} setIsOpen={() => setIsOpenField('signUp', false)}>
                <SignUpPopup
                    openSignIn={openSignIn}
                    setIsOpen={() => setIsOpenField('signUp', false)}
                />
            </Popup>
        </>
    );
}
