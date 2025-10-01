import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormField, LabelEdit, SecondButton, Select } from '@shared/ui';

interface IEditBoardProps {
    openLabelPopup: () => void;
}

const BoardSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Board name is too short' })
        .max(40, { message: 'Board name is too long' }),
});

type BoardValues = z.infer<typeof BoardSchema>;

export default function EditBoard({ openLabelPopup }: IEditBoardProps) {
    const [selected, setSelected] = useState({
        id: '1',
        label: 'My Boards',
    });

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
            id: '1',
            label: 'My Boards',
        },
        {
            id: '2',
            label: 'Another Boards',
        },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(BoardSchema) });

    return (
        <div className="flex justify-center flex-col gap-6 px-8 pb-9 w-112">
            <FormField
                register={register}
                name="name"
                error={errors.name}
                placeholder="Enter board name"
                label="Board Name"
            />
            <span className="flex justify-between items-center w-full">
                <b>Group</b>
                <Select list={groups} selected={selected} setSelected={setSelected} />
            </span>
            <hr className="text-bg-neutral-lighter" />
            <b>Labels</b>
            <div className="flex flex-wrap gap-2">
                <SecondButton onClick={openLabelPopup}>Configure Labels</SecondButton>
                {board.labels.map(l => (
                    <LabelEdit key={l.name} name={l.name} color={l.color} onClick={() => {}} />
                ))}
            </div>
        </div>
    );
}
