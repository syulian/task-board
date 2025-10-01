'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

function SessionInfo() {
    const { data: session } = useSession();

    return (
        <p className="text-text-secondary">
            {session?.user
                ? `You've successfully logged in as ${session.user.name}.`
                : 'To use the app, you need to log in to your account.'}
        </p>
    );
}

export default SessionInfo;
