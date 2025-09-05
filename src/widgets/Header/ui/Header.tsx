import React from 'react';
import { HiOutlineBookOpen, HiOutlineCalendarDays, HiOutlineTag } from 'react-icons/hi2';
import { setIsExpanded } from '@features/RightSidebar';
import { SearchInput } from '@features/SearchInput';
import { useAppDispatch, useAppSelector } from '@shared/lib';
import { DefaultButton, SettingsButton } from '@shared/ui';

export default function Header() {
    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    return (
        <header className="py-4 flex items-center justify-between gap-4">
            <div className="flex gap-4 w-full">
                <SettingsButton onClick={() => {}}>{'NAME'}</SettingsButton>
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
                        <DefaultButton onClick={() => {}}>
                            <HiOutlineTag size={24} />
                        </DefaultButton>
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
