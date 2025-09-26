import { useMutation } from '@apollo/client/react';
import React, { FormEvent, useState } from 'react';
import { CREATE_BOARDS_GROUP } from '@entities/Board/api/createBoardsGroup';
import { ConfirmButton, DefaultInput } from '@shared/ui';

export default function AddGroupDropDown() {
    const [newBoard, { loading, error }] = useMutation(CREATE_BOARDS_GROUP, {
        refetchQueries: ['GetBoardsGroups'],
    });
    const [value, setValue] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (loading || !value.length) return;

        await newBoard({ variables: { name: value, order: 1 } });
        setValue('');
    };

    return (
        <form className="flex flex-col gap-6 p-4 font-normal min-w-72" onSubmit={handleSubmit}>
            <DefaultInput
                onChange={event => setValue(event.target.value)}
                placeholder="Enter name..."
                label="Group Name"
                value={value}
            />
            <ConfirmButton type="submit" ariaLabel="Add Group" disabled={!value.length}>
                Add Group
            </ConfirmButton>
        </form>
    );
}
