'use client';
import { useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { z } from 'zod';
import { GET_LABELS } from '@entities/Label/api/getLabels';
import useNewLabel from '@entities/Label/lib/hooks/useNewLabel';
import { LabelDragAndDropOrderContext } from '@entities/Label/model/context/labelDragAndDropOrderContext';
import ILabel from '@entities/Label/model/types/ILabel';
import LabelSchema from '@entities/Label/model/types/LabelSchema';
import LabelController from '@entities/Label/ui/LabelController';
import LabelDrag from '@entities/Label/ui/LabelDrag';
import { useSortedItems } from '@shared/lib';
import { DefaultButton } from '@shared/ui';

type LabelValues = z.infer<typeof LabelSchema>;

export default function LabelPopup() {
    const [currentOrder, setCurrentOrder] = useState<ILabel | null>(null);
    const [labels, setLabels] = useState<ILabel[]>([]);

    const params = useParams<{ id: string }>();
    const { newLabel, createLabelLoading } = useNewLabel(params?.id);

    const { data, loading: getLabelsLoading } = useQuery<{ getLabels: ILabel[] }>(GET_LABELS, {
        variables: { boardId: params?.id },
    });

    useEffect(() => {
        if (!getLabelsLoading && data?.getLabels) {
            setLabels(data.getLabels);
        }
    }, [data, getLabelsLoading]);

    const { control, handleSubmit } = useForm({
        resolver: zodResolver(LabelSchema),
        defaultValues: { color: '#d62828', name: '' },
    });

    const onSubmit = async (data: LabelValues) => {
        if (createLabelLoading || !params) return;
        await newLabel({
            variables: { name: data.name, color: data.color, order: 1, boardId: params.id },
        });
    };

    const sortedLabels = useSortedItems<ILabel>(labels);

    return (
        <div className="flex justify-center flex-col gap-4 px-8 pb-9">
            <p className="font-bold text-center">Configure Labels</p>
            <form className="flex items-center gap-2 pl-12 pr-4" onSubmit={handleSubmit(onSubmit)}>
                <LabelController control={control} />
                <DefaultButton type="submit">
                    <HiOutlinePlusSmall size={24} />
                </DefaultButton>
            </form>
            <hr className="text-bg-neutral-lighter" />
            <LabelDragAndDropOrderContext
                value={{
                    currentOrder: currentOrder,
                    setCurrentOrder: setCurrentOrder,
                    setOrders: setLabels,
                }}
            >
                {sortedLabels.map(l => (
                    <LabelDrag label={l} key={l.id} />
                ))}
            </LabelDragAndDropOrderContext>
        </div>
    );
}
