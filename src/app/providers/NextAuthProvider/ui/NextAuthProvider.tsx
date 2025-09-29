'use client';
import { SessionProvider } from 'next-auth/react';
import React, { FC, ReactNode } from 'react';

interface INextAuthProviderProps {
    children: ReactNode;
}

const NextAuthProvider: FC<INextAuthProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
