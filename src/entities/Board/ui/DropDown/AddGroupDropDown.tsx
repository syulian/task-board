'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GroupSchema from '@entities/Board/model/types/GroupSchema';
import { useCreateBoardsGroupMutation } from '@shared/types';
import { ConfirmButton, FormField } from '@shared/ui';

type GroupValues = z.infer<typeof GroupSchema>;

export default function AddGroupDropDown() {
    const [newBoard, { loading, error }] = useCreateBoardsGroupMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(GroupSchema) });

    const onSubmit = async (data: GroupValues) => {
        if (loading) return;

        try {
            await newBoard({ variables: { name: data.name, order: 1 } });
        } catch (e) {
            console.error(e);
        }
    };

    const t = useTranslations('LeftSidebar');

    return (
        <form
            className="flex flex-col gap-8 p-4 font-normal min-w-72"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                placeholder={t('group.add.name')}
                label={t('group.name')}
                register={register}
                name="name"
                error={errors.name}
            />
            <ConfirmButton type="submit" ariaLabel={t('group.add.title')} error={error?.message}>
                {t('group.add.title')}
            </ConfirmButton>
        </form>
    );
}
