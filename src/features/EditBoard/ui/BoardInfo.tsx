'use client';
import { useMutation } from '@apollo/client/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import EditBoard from '@features/EditBoard/ui/EditBoard';
import { DELETE_BOARD } from '@entities/Board';
import { LabelPopup } from '@entities/Label';
import { createStateController } from '@shared/lib';
import { DropDownContainer, ListDropDown, Popup, SettingsButton } from '@shared/ui';

function BoardInfo() {
    const [deleteBoard] = useMutation(DELETE_BOARD, {
        refetchQueries: ['GetBoardsGroups'],
    });

    const [isOpen, setIsOpen] = useState({
        dropDown: false,
        edit: false,
        label: false,
    });
    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const params = useParams<{ id: string }>();
    const router = useRouter();
    const boardId = params?.id;

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
                    onClick: async () => {
                        await deleteBoard({ variables: { id: boardId } });
                        router.replace('/');
                    },
                },
            ],
        },
    ];

    const openLabelPopup = () => {
        setIsOpenField('edit', false);
        setIsOpenField('label', true);
    };

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
            <Popup isOpen={isOpen.edit} setIsOpen={() => setIsOpenField('edit', false)}>
                <EditBoard openLabelPopup={openLabelPopup} />
            </Popup>
            <Popup isOpen={isOpen.label} setIsOpen={() => setIsOpenField('label', false)}>
                <LabelPopup />
            </Popup>
        </div>
    );
}

export default BoardInfo;
