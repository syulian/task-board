import React, { useState } from 'react';
import { DefaultInput, Label } from '@shared/ui';
import Select from '@shared/ui/Select/Select';

export default function BoardPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('My Boards');

    const [board, setBoard] = useState({
        id: '1',
        name: 'Website',
        group: 'My Boards',
        labels: [
            {
                name: 'Important',
                color: '#bd2424',
            },
            {
                name: 'Nice',
                color: '#3ea9bc',
            },
        ],
    });

    const groups = [
        {
            children: [
                {
                    label: 'My Boards',
                    onClick: () => {
                        setSelected('My Boards');
                        setIsOpen(false);
                    },
                },
                {
                    label: 'Another Boards',
                    onClick: () => {
                        setSelected('Another Boards');
                        setIsOpen(false);
                    },
                },
            ],
        },
    ];

    return (
        <div className="flex justify-center flex-col gap-8 px-8 pb-9">
            <DefaultInput
                onSubmit={() => {}}
                onChange={() => {}}
                placeholder="Enter board name"
                label="Board Name"
            />
            <span className="flex items-center gap-8">
                <b>Group</b>
                <Select isOpen={isOpen} setIsOpen={setIsOpen} list={groups} selected={selected} />
            </span>
            <hr className="text-surface-lighter" />
            <b>Labels</b>
            <div className="flex flex-wrap gap-2">
                {board.labels.map(l => (
                    <Label key={l.name} name={l.name} color={l.color} />
                ))}
            </div>
        </div>
    );
}
