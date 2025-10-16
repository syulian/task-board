'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
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

    const t = useTranslations('LeftSidebar');

    return (
        <form className="flex flex-col gap-8 p-4 font-normal" onSubmit={handleSubmit(onSubmit)}>
            <FormField
                placeholder={t('board.add.name')}
                label={t('board.name')}
                register={register}
                name="name"
                error={errors.name}
            />
            <ConfirmButton type="submit" ariaLabel={t('board.add.title')} error={error?.message}>
                {t('board.add.title')}
            </ConfirmButton>
        </form>
    );
}
