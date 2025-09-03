'use client';
import React from 'react';
import { NavigationMenu } from '@features/NavigationMenu';

export default function RightSidebar() {
    return (
        <aside className="min-w-85 max-w-95 bg-surface-dark h-screen flex flex-col gap-2 p-4 overflow-y-scroll border-surface-light border-l">
            <NavigationMenu />
        </aside>
    );
}
