'use client';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineTag } from 'react-icons/hi2';
import { BoardInfo } from '@features/EditBoard';
import { setIsExpanded } from '@features/RightSidebar';
import { SearchInput } from '@features/SearchInput';
import { LabelPopup } from '@entities/Label';
import { createStateController, useAppDispatch, useAppSelector } from '@shared/lib';
import { DefaultButton, Popup } from '@shared/ui';

export default function Header() {
    const [isOpen, setIsOpen] = useState({
        popup: false,
    });

    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);
    const { status } = useSession();

    const t = useTranslations('Header');

    return (
        <>
            {status === 'authenticated' && (
                <header className="py-4 flex items-center justify-between gap-4 bg-bg-primary">
                    <div className="flex gap-4 w-full">
                        <BoardInfo />
                        <SearchInput />
                    </div>
                    <nav>
                        <ul className="flex">
                            <li>
                                <DefaultButton
                                    onClick={() => setIsOpenField('popup', true)}
                                    ariaLabel={t('dropDown.label')}
                                >
                                    <HiOutlineTag size={24} />
                                </DefaultButton>
                                <Popup
                                    isOpen={isOpen.popup}
                                    setIsOpen={() => setIsOpenField('popup', false)}
                                >
                                    <LabelPopup />
                                </Popup>
                            </li>
                            <li>
                                <DefaultButton
                                    onClick={() => dispatch(setIsExpanded(!isExpanded))}
                                    ariaLabel={
                                        isExpanded
                                            ? t('dropDown.panel.hide')
                                            : t('dropDown.panel.open')
                                    }
                                >
                                    <HiOutlineBookOpen size={24} />
                                </DefaultButton>
                            </li>
                        </ul>
                    </nav>
                </header>
            )}
        </>
    );
}
