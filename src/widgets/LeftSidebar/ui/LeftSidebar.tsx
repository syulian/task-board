'use client';
import Image from 'next/image';
import React from 'react';
import {
    HiMiniChevronDoubleLeft,
    HiOutlinePlusCircle,
    HiOutlineCog8Tooth,
    HiOutlineCloud,
    HiOutlineUserCircle,
} from 'react-icons/hi2';
import { NavigationMenu } from '@features/NavigationMenu';
import { NavButton } from '@shared/ui';

export default function LeftSidebar() {
    return (
        <aside className="flex flex-col min-w-85 max-w-95 bg-surface-dark h-screen relative border-surface-light border-r">
            <div className="flex flex-col gap-2 p-4 overflow-y-scroll">
                <NavButton onClick={() => {}}>
                    <Image alt="logo" src="/icons/apple-touch-icon.png" width={24} height={24} />
                    Task Board
                </NavButton>
                <NavButton onClick={() => {}}>
                    <HiOutlineUserCircle aria-hidden="true" size={24} />
                    tony_redgrave
                </NavButton>
                <NavButton onClick={() => {}}>
                    <HiOutlineCloud aria-hidden="true" size={24} />
                    Synced
                </NavButton>
                <NavigationMenu />
            </div>
            <div className="flex flex-col gap-2 mt-auto p-4 border-t border-surface-light sticky bottom-0 bg-surface-dark">
                <NavButton onClick={() => {}}>
                    <HiOutlinePlusCircle aria-hidden="true" size={24} />
                    Add Group
                </NavButton>
                <NavButton onClick={() => {}}>
                    <HiOutlineCog8Tooth aria-hidden="true" size={24} />
                    Settings
                    <HiMiniChevronDoubleLeft aria-hidden="true" size={24} className="ml-auto" />
                </NavButton>
            </div>
        </aside>
    );
}
