'use client';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { z } from 'zod';
import { CREATE_USER } from '@entities/User/api/createUser';
import { ConfirmButton, FormField, GoogleButton } from '@shared/ui';

interface ISignUpPopupProps {
    openSignIn: () => void;
    setIsOpen: () => void;
}

const UserSignUpSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Name is too short' })
        .max(50, { message: 'Name is too long' }),
    email: z.email(),
    password: z
        .string()
        .min(8, { message: 'Password is too short' })
        .max(25, { message: 'Password is too long' }),
});

type UserSignUpValues = z.infer<typeof UserSignUpSchema>;

export default function SignUpPopup({ openSignIn, setIsOpen }: ISignUpPopupProps) {
    const [createUser, { loading: createUserLoading }] = useMutation(CREATE_USER);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(UserSignUpSchema) });

    const onSubmit = async (data: UserSignUpValues) => {
        if (createUserLoading) return;

        await createUser({
            variables: { name: data.name, email: data.email, password: data.password },
        });

        const res = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (res?.error) setError(res?.error);
        else {
            setError('');
            setIsOpen();
        }
    };

    return (
        <form
            className="flex justify-center flex-col gap-10 px-8 pb-9"
            onSubmit={handleSubmit(onSubmit)}
        >
            <b className="text-lg">Sign up</b>
            <div className="flex justify-center flex-col gap-6">
                <FormField
                    error={errors.email}
                    name="email"
                    register={register}
                    placeholder="Enter email"
                    type="email"
                    label="Email"
                />
                <FormField
                    error={errors.name}
                    name="name"
                    register={register}
                    placeholder="Enter name"
                    label="Name"
                />
                <FormField
                    error={errors.password}
                    name="password"
                    register={register}
                    placeholder="Enter password"
                    type="password"
                    label="Password"
                />
                <ConfirmButton type="submit" ariaLabel="Sign up" error={error}>
                    Sign up <HiMiniArrowRight size={24} />
                </ConfirmButton>
                <GoogleButton>Sign up with Google</GoogleButton>
            </div>
            <div className="flex gap-2">
                <p>Already have an account?</p>
                <button
                    type="button"
                    onClick={openSignIn}
                    className="font-bold hover:underline cursor-pointer"
                >
                    Sign in
                </button>
            </div>
        </form>
    );
}
