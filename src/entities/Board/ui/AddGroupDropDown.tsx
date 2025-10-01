import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CREATE_BOARDS_GROUP } from '@entities/Board/api/createBoardsGroup';
import { ConfirmButton, FormField } from '@shared/ui';

const GroupSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Group name is too short' })
        .max(30, { message: 'Group name is too long' }),
});

type GroupValues = z.infer<typeof GroupSchema>;

export default function AddGroupDropDown() {
    const [newBoard, { loading, error }] = useMutation(CREATE_BOARDS_GROUP, {
        refetchQueries: ['GetBoardsGroups'],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(GroupSchema) });

    const onSubmit = async (data: GroupValues) => {
        if (loading) return;
        await newBoard({ variables: { name: data.name, order: 1 } });
    };

    return (
        <form
            className="flex flex-col gap-8 p-4 font-normal min-w-72"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                placeholder="Enter name..."
                label="Group Name"
                register={register}
                name="name"
                error={errors.name}
            />
            <ConfirmButton type="submit" ariaLabel="Add Group" error={error?.message}>
                Add Group
            </ConfirmButton>
        </form>
    );
}
