'use client';
import React, { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';
import { setIsExpanded } from '@features/RightSidebar';
import { SearchInput } from '@features/SearchInput';
import { BoardPopup } from '@entities/Board';
import { LabelPopup } from '@entities/Label';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { DefaultButton, DropDownContainer, DropDownList, SettingsButton, Popup } from '@shared/ui';

export default function Header() {
    const [isOpen, setIsOpen] = useState({
        dropDown: false,
        popup: false,
        edit: false,
    });

    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    const dropDownList = [
        {
            title: '2 Lists, 3 Cards',
            children: [
                {
                    label: 'Edit',
                    onClick: () => {
                        setIsOpen(prev => ({
                            ...prev,
                            dropDown: false,
                            edit: true,
                        }));
                    },
                },
                {
                    label: 'Delete',
                    onClick: () => {},
                },
            ],
        },
    ];

    return (
        <header className="py-4 flex items-center justify-between gap-4">
            <div className="flex gap-4 w-full">
                <div className="flex relative">
                    <SettingsButton
                        onClick={() =>
                            setIsOpen(prev => ({
                                ...prev,
                                dropDown: true,
                            }))
                        }
                    >
                        Board name
                    </SettingsButton>
                    <DropDownContainer
                        isOpen={isOpen.dropDown}
                        setIsOpen={() =>
                            setIsOpen(prev => ({
                                ...prev,
                                dropDown: false,
                            }))
                        }
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
                        <DefaultButton
                            onClick={() =>
                                setIsOpen(prev => ({
                                    ...prev,
                                    popup: true,
                                }))
                            }
                        >
                            <HiOutlineTag size={24} />
                        </DefaultButton>
                        <Popup
                            isOpen={isOpen.popup}
                            setIsOpen={() =>
                                setIsOpen(prev => ({
                                    ...prev,
                                    popup: false,
                                }))
                            }
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
            <Popup
                isOpen={isOpen.edit}
                setIsOpen={() =>
                    setIsOpen(prev => ({
                        ...prev,
                        edit: false,
                    }))
                }
            >
                <BoardPopup />
            </Popup>
        </header>
    );
}
