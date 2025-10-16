'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { z } from 'zod';
import UserSignInSchema from '@entities/User/model/types/UserSignInSchema';
import { ConfirmButton, FormField, GoogleButton } from '@shared/ui';

interface ISignInPopupProps {
    openSignUp: () => void;
    setIsOpen: () => void;
}

type UserSignInValues = z.infer<typeof UserSignInSchema>;

export default function SignInPopup({ openSignUp, setIsOpen }: ISignInPopupProps) {
    const [error, setError] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(UserSignInSchema) });

    const onSubmit = async (data: UserSignInValues) => {
        setError('');

        try {
            const newSignIn = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (newSignIn?.error) return setError(newSignIn.error);

            setIsOpen();
        } catch (e) {
            const newError = e as Error;
            setError(newError.message);
        }
    };

    const t = useTranslations('LeftSidebar');

    return (
        <form
            className="flex justify-center flex-col gap-10 px-8 pb-9"
            onSubmit={handleSubmit(onSubmit)}
        >
            <b className="text-lg">{t('profile.signIn')}</b>
            <div className="flex justify-center flex-col gap-8">
                <FormField
                    placeholder={t('profile.change.email.name')}
                    label={t('profile.change.email.title')}
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email}
                />
                <FormField
                    placeholder={t('profile.change.password.name')}
                    label={t('profile.change.password.title')}
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password}
                />
                <ConfirmButton type="submit" ariaLabel={t('profile.signIn')} error={error}>
                    {t('profile.signIn')} <HiMiniArrowRight size={24} />
                </ConfirmButton>
                <GoogleButton>{t('profile.signInWithGoogle')}</GoogleButton>
            </div>
            <div className="flex gap-2">
                <p>{t('profile.noAccount')}</p>
                <button
                    type="button"
                    onClick={openSignUp}
                    aria-label={t('profile.signUp')}
                    className="font-bold hover:underline cursor-pointer"
                >
                    {t('profile.signUp')}
                </button>
            </div>
        </form>
    );
}
