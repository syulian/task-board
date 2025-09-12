import React from 'react';
import { HiMiniArrowRight } from 'react-icons/hi2';
import { ConfirmButton, DefaultInput } from '@shared/ui';

export default function SignInPopup() {
    return (
        <div className="flex justify-center flex-col gap-10 px-8 pb-9">
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
                <ConfirmButton onClick={() => {}} ariaLabel="Sign in" disabled={true}>
                    Sign in <HiMiniArrowRight size={24} />
                </ConfirmButton>
            </div>
            <div className="flex gap-2">
                <p>Don&#39;t have an account?</p>
                <b>Sign up</b>
            </div>
        </div>
    );
}
