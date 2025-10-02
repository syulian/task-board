'use client';
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

    return (
        <header className="py-4 flex items-center justify-between gap-4">
            <div className="flex gap-4 w-full">
                <BoardInfo />
                <SearchInput onChange={() => {}} />
            </div>
            <nav>
                <ul className="flex">
                    <li>
                        <DefaultButton onClick={() => setIsOpenField('popup', true)}>
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
                        <DefaultButton onClick={() => dispatch(setIsExpanded(!isExpanded))}>
                            <HiOutlineBookOpen size={24} />
                        </DefaultButton>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
