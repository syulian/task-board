'use client';
import React from 'react';
import {
    HiClipboardDocumentList,
    HiMiniChevronDoubleLeft,
    HiMiniUserCircle,
    HiCog8Tooth,
    HiOutlinePlusSmall,
    HiCloud,
} from 'react-icons/hi2';
import { NavigationMenu } from '@features/NavigationMenu';
import { NavButton } from '@shared/ui';

export default function LeftSidebar() {
    return (
        <aside className="w-110 bg-surface-dark h-screen flex flex-col gap-2 p-3 overflow-y-scroll relative border-surface-light border-r">
            <NavButton onClick={() => {}}>
                <HiClipboardDocumentList aria-hidden="true" size={24} />
                Task Board
            </NavButton>
            <NavButton onClick={() => {}}>
                <HiMiniUserCircle aria-hidden="true" size={24} />
                tony_redgrave
            </NavButton>
            <NavButton onClick={() => {}}>
                <HiCloud aria-hidden="true" size={24} />
                Synced
            </NavButton>
            <NavigationMenu />
            <div className="mt-3">
                <NavButton onClick={() => {}}>
                    <HiOutlinePlusSmall aria-hidden="true" size={24} />
                    Add Group
                </NavButton>
            </div>
            <div className="mt-auto border-surface-light border-t pt-3">
                <NavButton onClick={() => {}}>
                    <HiCog8Tooth aria-hidden="true" size={24} />
                    Settings
                    <HiMiniChevronDoubleLeft aria-hidden="true" size={24} className="ml-auto" />
                </NavButton>
            </div>
        </aside>
    );
}
