'use client';
import { useSession } from 'next-auth/react';
import React from 'react';
import { DropDownContainer, ListDropDown, SettingsButton } from '@shared/ui';

function BoardInfo() {
    const { data: session } = useSession();

    const dropDownList = [
        {
            title: '2 Lists, 3 Tasks',
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

    return (
        <div className="flex relative">
            <SettingsButton onClick={() => setIsOpenField('dropDown', true)}>
                Board name
            </SettingsButton>
            <DropDownContainer
                isOpen={isOpen.dropDown}
                setIsOpen={() => setIsOpenField('dropDown', false)}
                className="left-0 top-full"
            >
                <ListDropDown list={dropDownList} />
            </DropDownContainer>
        </div>
    );
}

export default BoardInfo;
