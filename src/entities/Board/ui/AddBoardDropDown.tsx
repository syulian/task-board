import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useCreateBoardMutation } from '@shared/types/generated/graphql';
import { ConfirmButton, FormField } from '@shared/ui';

interface IAddBoardDropDownProps {
    groupId: string;
}

const BoardSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Board name is too short' })
        .max(30, { message: 'Board name is too long' }),
});

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
        await newBoard({ variables: { name: data.name, order: 1, groupId } });
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
