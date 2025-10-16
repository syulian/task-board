'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Calendar, TaskSchema } from '@entities/Task';
import { getDate, getHour } from '@shared/lib';
import { DropDownContainer, SecondButton } from '@shared/ui';

type TaskValues = z.infer<typeof TaskSchema>;

interface IDateController {
    dueDate: Date | null;
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    control: Control<TaskValues>;
}

function DateController({ dueDate, isOpen, setIsOpen, control }: IDateController) {
    const t = useTranslations('Main');

    return (
        <div className="flex justify-between items-center w-full">
            <b>{t('task.change.date')}</b>
            <div className="relative">
                <SecondButton onClick={() => setIsOpen(true)} ariaLabel={t('task.change.date')}>
                    {dueDate ? `${getDate(dueDate, t)}, ${getHour(dueDate)}` : 'None'}
                </SecondButton>
                <DropDownContainer
                    isOpen={isOpen}
                    setIsOpen={() => setIsOpen(false)}
                    className="left-full -bottom-48"
                >
                    <Controller
                        name="dueDate"
                        control={control}
                        render={({ field }) => (
                            <Calendar
                                setSelectedDate={newDate => field.onChange(newDate)}
                                selectedDate={field.value}
                                setIsOpen={() => setIsOpen(false)}
                            />
                        )}
                    />
                </DropDownContainer>
            </div>
        </div>
    );
}

export default DateController;
