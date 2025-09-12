'use client';
import React, { useState } from 'react';
import { ConfirmButton, DefaultInput } from '@shared/ui';

interface IDropDownAddGroupProps {
    groupId?: string;
}

export default function DropDownAddGroup({ groupId }: IDropDownAddGroupProps) {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-6 p-4 font-normal">
            <DefaultInput
                onSubmit={() => {}}
                onChange={event => setValue(event.target.value)}
                placeholder="Enter name..."
                label="Group Name"
            />
            <ConfirmButton onClick={() => {}} ariaLabel="Add Group" disabled={!!value.length}>
                Add Group
            </ConfirmButton>
        </div>
    );
}
