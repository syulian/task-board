import { useTranslations } from 'next-intl';
import React, { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { HiMiniTag } from 'react-icons/hi2';
import { z } from 'zod';
import { LabelDropDown, TaskLabel } from '@entities/Label';
import { TaskSchema } from '@entities/Task';
import { DropDownContainer, SecondButton } from '@shared/ui';

type TaskValues = z.infer<typeof TaskSchema>;

interface ILabelController {
    labels: TaskLabel[];
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
    control: Control<TaskValues>;
    children: ReactNode;
}

function LabelController({ labels, isOpen, setIsOpen, control, children }: ILabelController) {
    const t = useTranslations('Main');

    return (
        <div className="flex flex-wrap gap-2">
            <div className="relative">
                <SecondButton onClick={() => setIsOpen(true)} ariaLabel={t('task.change.label')}>
                    <HiMiniTag size={18} />
                    {t('task.change.label')}
                </SecondButton>
                <Controller
                    name="labels"
                    control={control}
                    render={({ field }) => {
                        const toggleLabel = (id: string) => {
                            const value = field.value;
                            if (!value) return;

                            const newLabels = value.includes(id)
                                ? value.filter(l => l !== id)
                                : [...value, id];
                            field.onChange(newLabels);
                        };

                        return (
                            <DropDownContainer
                                isOpen={isOpen}
                                setIsOpen={() => setIsOpen(false)}
                                className="left-0 bottom-0"
                            >
                                <LabelDropDown
                                    labels={labels}
                                    selected={field.value}
                                    onChange={toggleLabel}
                                />
                            </DropDownContainer>
                        );
                    }}
                />
            </div>
            {children}
        </div>
    );
}

export default LabelController;
