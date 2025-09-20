import React, { useState } from 'react';
import { ConfirmButton, DefaultInput } from '@shared/ui';

export default function AddGroupDropDown() {
    const [value, setValue] = useState('');

    return (
        <div className="flex flex-col gap-6 p-4 font-normal min-w-72">
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
