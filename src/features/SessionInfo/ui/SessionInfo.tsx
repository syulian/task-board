'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

function SessionInfo() {
    const session = useSession();

    return (
        <p className="text-text-secondary">
            {session.data?.user
                ? `You've successfully logged in as ${session.data.user.name}.`
                : 'To use the app, you need to log in to your account.'}
        </p>
    );
}

export default SessionInfo;
