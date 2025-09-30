import { useMutation } from '@apollo/client/react';
import React, { FormEvent, useState } from 'react';
import { CREATE_BOARD } from '@entities/Board/api/createBoard';
import { ConfirmButton, FormField } from '@shared/ui';

interface IAddBoardDropDownProps {
    groupId: string;
}

export default function AddBoardDropDown({ groupId }: IAddBoardDropDownProps) {
    const [newBoard, { loading, error }] = useMutation(CREATE_BOARD, {
        refetchQueries: ['GetBoardsGroups'],
    });
    const [value, setValue] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading || !value.length) return;

        await newBoard({ variables: { name: value, order: 1, groupId } });
        setValue('');
    };

    return (
        <form className="flex flex-col gap-6 p-4 font-normal" onSubmit={handleSubmit}>
            <FormField
                onChange={event => setValue(event.target.value)}
                placeholder="Enter name..."
                label="Board Name"
                value={value}
            />
            <ConfirmButton type="submit" ariaLabel="Add Board">
                Add Board
            </ConfirmButton>
        </form>
    );
}
