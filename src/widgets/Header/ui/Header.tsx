'use client';
import React, { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';
import { EditBoard } from '@features/EditBoard';
import { setIsExpanded } from '@features/RightSidebar';
import { SearchInput } from '@features/SearchInput';
import { LabelPopup } from '@entities/Label';
import { createStateController, useAppDispatch, useAppSelector } from '@shared/lib';
import { DefaultButton, DropDownContainer, DropDownList, SettingsButton, Popup } from '@shared/ui';

export default function Header() {
    const [isOpen, setIsOpen] = useState({
        dropDown: false,
        popup: false,
        edit: false,
        label: false,
    });

    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const dropDownList = [
        {
            title: '2 Lists, 3 Cards',
            children: [
                {
                    label: 'Edit',
                    onClick: () => {
                        setIsOpenField('dropDown', false);
                        setIsOpenField('edit', true);
                    },
                },
                {
                    label: 'Delete',
                    onClick: () => {},
                },
            ],
        },
    ];

    const openLabelPopup = () => {
        setIsOpenField('edit', false);
        setIsOpenField('label', true);
    };

    return (
        <header className="py-4 flex items-center justify-between gap-4">
            <div className="flex gap-4 w-full">
                <div className="flex relative">
                    <SettingsButton onClick={() => setIsOpenField('dropDown', true)}>
                        Board name
                    </SettingsButton>
                    <DropDownContainer
                        isOpen={isOpen.dropDown}
                        setIsOpen={() => setIsOpenField('dropDown', false)}
                        className="left-0 top-full"
                    >
                        <DropDownList list={dropDownList} />
                    </DropDownContainer>
                </div>
                <SearchInput onChange={() => {}} />
            </div>
            <nav>
                <ul className="flex">
                    <li>
                        <DefaultButton onClick={() => {}}>
                            <HiOutlineCalendarDays size={24} />
                        </DefaultButton>
                    </li>
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
            <Popup isOpen={isOpen.edit} setIsOpen={() => setIsOpenField('edit', false)}>
                <EditBoard openLabelPopup={openLabelPopup} />
            </Popup>
            <Popup isOpen={isOpen.label} setIsOpen={() => setIsOpenField('label', false)}>
                <LabelPopup />
            </Popup>
        </header>
    );
}
