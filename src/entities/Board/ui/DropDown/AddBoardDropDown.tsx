import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BoardSchema from '@entities/Board/model/types/BoardSchema';
import { useCreateBoardMutation } from '@shared/types';
import { ConfirmButton, FormField } from '@shared/ui';

interface IAddBoardDropDownProps {
    groupId: string;
}

type BoardValues = z.infer<typeof BoardSchema>;

export default function AddBoardDropDown({ groupId }: IAddBoardDropDownProps) {
    const [newBoard, { loading, error }] = useCreateBoardMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(BoardSchema) });

    const onSubmit = async (data: BoardValues) => {
        if (loading) return;

        try {
            await newBoard({ variables: { name: data.name, order: 1, groupId } });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <form className="flex flex-col gap-8 p-4 font-normal" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                placeholder="Enter name..."
                label="Board Name"
                register={register}
                name="name"
                error={errors.name}
            />
            <ConfirmButton type="submit" ariaLabel="Add Board" error={error?.message}>
                Add Board
            </ConfirmButton>
        </form>
    );
}
