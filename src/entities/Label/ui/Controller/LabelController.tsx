'use client';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';
import LabelSchema from '@entities/Label/model/types/LabelSchema';
import ColorsDropDown from '@entities/Label/ui/DropDown/ColorsDropDown';
import { AddInput, ColorButton, DropDownContainer } from '@shared/ui';

type LabelValues = z.infer<typeof LabelSchema>;

interface ILabelControllerProps {
    control: Control<LabelValues>;
}

export default function LabelController({ control }: ILabelControllerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Main');

    return (
        <>
            <Controller
                name="color"
                control={control}
                render={({ field }) => (
                    <div className="relative">
                        <ColorButton
                            color={field.value}
                            onClick={() => setIsOpen(true)}
                            ariaLabel={t('label.change.color')}
                        />
                        <DropDownContainer
                            isOpen={isOpen}
                            setIsOpen={() => setIsOpen(false)}
                            className="left-0 top-full"
                        >
                            <ColorsDropDown onClick={color => field.onChange(color)} />
                        </DropDownContainer>
                    </div>
                )}
            />
            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <AddInput
                        onChange={event => field.onChange(event.target.value)}
                        placeholder={t('input.add.title')}
                        value={field.value}
                        ariaLabel={t('label.add')}
                    />
                )}
            />
        </>
    );
}
