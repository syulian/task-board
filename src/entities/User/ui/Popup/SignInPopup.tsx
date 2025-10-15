'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
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

    return (
        <form
            className="flex justify-center flex-col gap-10 px-8 pb-9"
            onSubmit={handleSubmit(onSubmit)}
        >
            <b className="text-lg">Sign in</b>
            <div className="flex justify-center flex-col gap-8">
                <FormField
                    placeholder="Enter email"
                    label="Email"
                    name="email"
                    register={register}
                    error={errors.email}
                />
                <FormField
                    placeholder="Enter password"
                    type="password"
                    label="Password"
                    name="password"
                    register={register}
                    error={errors.password}
                />
                <ConfirmButton type="submit" ariaLabel="Sign in" error={error}>
                    Sign in <HiMiniArrowRight size={24} />
                </ConfirmButton>
                <GoogleButton>Sign in with Google</GoogleButton>
            </div>
            <div className="flex gap-2">
                <p>Don&#39;t have an account?</p>
                <button
                    type="button"
                    onClick={openSignUp}
                    className="font-bold hover:underline cursor-pointer"
                >
                    Sign up
                </button>
            </div>
        </form>
    );
}
