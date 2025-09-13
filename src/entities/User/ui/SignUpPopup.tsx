import React from 'react';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { ConfirmButton, DefaultInput } from '@shared/ui';

interface ISignUpPopupProps {
    openSignIn: () => void;
}

export default function SignUpPopup({ openSignIn }: ISignUpPopupProps) {
    return (
        <div className="flex justify-center flex-col gap-10 px-8 pb-9">
            <b className="text-lg">Sign up</b>
            <div className="flex justify-center flex-col gap-6">
                <DefaultInput
                    onSubmit={() => {}}
                    onChange={() => {}}
                    placeholder="Enter email"
                    type="email"
                    label="Email"
                />
                <DefaultInput
                    onSubmit={() => {}}
                    onChange={() => {}}
                    placeholder="Enter name"
                    label="Name"
                />
                <DefaultInput
                    onSubmit={() => {}}
                    onChange={() => {}}
                    placeholder="Enter password"
                    type="password"
                    label="Password"
                />
                <ConfirmButton onClick={() => {}} ariaLabel="Sign up" disabled={true}>
                    Sign up <HiMiniArrowRight size={24} />
                </ConfirmButton>
            </div>
            <div className="flex gap-2">
                <p>Already have an account?</p>
                <button onClick={openSignIn} className="font-bold hover:underline cursor-pointer">
                    Sign in
                </button>
            </div>
        </div>
    );
}
