'use client';
import React, { useState } from 'react';
import { ConfirmButton, DefaultInput } from '@shared/ui';

interface IAddBoardDropDownProps {
    groupId: string;
}

export default function AddBoardDropDown({ groupId }: IAddBoardDropDownProps) {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-6 p-4 font-normal">
            <DefaultInput
                onSubmit={() => {}}
                onChange={event => setValue(event.target.value)}
                placeholder="Enter name..."
                label="Board Name"
            />
            <ConfirmButton onClick={() => {}} ariaLabel="Add Board" disabled={!!value.length}>
                Add Board
            </ConfirmButton>
        </div>
    );
}
