'use client';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import EditBoard from '@features/EditBoard/ui/EditBoard';
import { LabelPopup } from '@entities/Label';
import { createStateController } from '@shared/lib';
import { useDeleteBoardMutation, useGetBoardQuery } from '@shared/types/generated/graphql';
import { DropDownContainer, ListDropDown, Popup, SettingsButton } from '@shared/ui';

function BoardInfo() {
    const [deleteBoard] = useDeleteBoardMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    const [isOpen, setIsOpen] = useState({
        dropDown: false,
        edit: false,
        label: false,
    });
    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const params = useParams<{ id: string }>();
    const boardId = params?.id;
    const router = useRouter();

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
                        if (!boardId) return;

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

    const { data } = useGetBoardQuery({ variables: { id: boardId ?? '' }, skip: !boardId });
    const board = data?.getBoard;

    return (
        <div className="flex relative">
            <SettingsButton onClick={() => setIsOpenField('dropDown', true)}>
                {board?.name ?? 'Board'}
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
