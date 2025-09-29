import React, { FormEvent } from 'react';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { ConfirmButton, DefaultInput } from '@shared/ui';
import GoogleButton from '@shared/ui/Button/GoogleButton/GoogleButton';

interface ISignInPopupProps {
    openSignUp: () => void;
}

export default function SignInPopup({ openSignUp }: ISignInPopupProps) {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {};

    return (
        <form className="flex justify-center flex-col gap-10 px-8 pb-9" onSubmit={handleSubmit}>
            <b className="text-lg">Sign in</b>
            <div className="flex justify-center flex-col gap-6">
                <DefaultInput
                    onSubmit={() => {}}
                    onChange={() => {}}
                    placeholder="Enter email"
                    label="Email"
                />
                <DefaultInput
                    onSubmit={() => {}}
                    onChange={() => {}}
                    placeholder="Enter password"
                    type="password"
                    label="Password"
                />
                <ConfirmButton type="submit" ariaLabel="Sign in" disabled={true}>
                    Sign in <HiMiniArrowRight size={24} />
                </ConfirmButton>
                <GoogleButton>Sign in with Google</GoogleButton>
            </div>
            <div className="flex gap-2">
                <p>Don&#39;t have an account?</p>
                <button onClick={openSignUp} className="font-bold hover:underline cursor-pointer">
                    Sign up
                </button>
            </div>
        </form>
    );
}
