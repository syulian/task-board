'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { z } from 'zod';
import UserSignUpSchema from '@entities/User/model/types/UserSignUpSchema';
import { useCreateUserMutation } from '@shared/types';
import { ConfirmButton, FormField, GoogleButton } from '@shared/ui';

interface ISignUpPopupProps {
    openSignIn: () => void;
    setIsOpen: () => void;
}

type UserSignUpValues = z.infer<typeof UserSignUpSchema>;

export default function SignUpPopup({ openSignIn, setIsOpen }: ISignUpPopupProps) {
    const [createUser, { loading: createUserLoading }] = useCreateUserMutation();
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(UserSignUpSchema) });

    const onSubmit = async (data: UserSignUpValues) => {
        setError('');

        try {
            if (createUserLoading) return;

            await createUser({
                variables: { name: data.name, email: data.email, password: data.password },
            });

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
            <b className="text-lg">{t('profile.signUp')}</b>
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
                    placeholder={t('profile.change.name.name')}
                    label={t('profile.change.name.title')}
                    name="name"
                    register={register}
                    error={errors.name}
                />
                <FormField
                    placeholder={t('profile.change.password.name')}
                    label={t('profile.change.email.title')}
                    name="password"
                    type="password"
                    register={register}
                    error={errors.password}
                />
                <ConfirmButton type="submit" ariaLabel={t('profile.signUp')} error={error}>
                    {t('profile.signUp')} <HiMiniArrowRight size={24} />
                </ConfirmButton>
                <GoogleButton>{t('profile.signUpWithGoogle')}</GoogleButton>
            </div>
            <div className="flex gap-2">
                <p>{t('profile.account')}</p>
                <button
                    type="button"
                    onClick={openSignIn}
                    aria-label={t('profile.signIn')}
                    className="font-bold hover:underline cursor-pointer"
                >
                    {t('profile.signIn')}
                </button>
            </div>
        </form>
    );
}
