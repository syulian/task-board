import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller } from 'react-hook-form';
import { HiMiniCheck } from 'react-icons/hi2';
import useEditBoard from '@features/EditBoard/lib/hooks/useEditBoard';
import { DefaultButton, FormField, LabelEdit, SecondButton, Select } from '@shared/ui';

interface IEditBoardProps {
    openLabelPopup: () => void;
}

export default function EditBoard({ openLabelPopup }: IEditBoardProps) {
    const {
        handleSubmit,
        onSubmit,
        register,
        errors,
        control,
        groups,
        labels,
        handleDelete,
        isDirty,
    } = useEditBoard();

    const tH = useTranslations('Header');
    const tM = useTranslations('Main');

    return (
        <form
            className="flex justify-center flex-col gap-6 px-8 pb-9 w-112 relative"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                register={register}
                name="name"
                error={errors.name}
                placeholder={tH('board.change.name.name')}
                label={tH('board.change.name.title')}
            />
            <span className="flex justify-between items-center w-full">
                <b>{tH('group.change.name.title')}</b>
                <Controller
                    control={control}
                    name="group"
                    render={({ field }) => (
                        <Select
                            list={groups}
                            selected={field.value}
                            setSelected={field.onChange}
                            ariaLabel={tH('group.title')}
                        />
                    )}
                />
            </span>
            <hr className="text-bg-neutral-lighter" />
            <b>Labels</b>
            <div className="flex flex-wrap gap-2">
                <SecondButton onClick={openLabelPopup} ariaLabel={tM('label.title')}>
                    {tM('label.title')}
                </SecondButton>
                {labels.map(l => (
                    <LabelEdit
                        key={l.id}
                        name={l.name}
                        color={l.color}
                        onClick={() => handleDelete(l.id)}
                    />
                ))}
            </div>
            {isDirty && (
                <DefaultButton
                    type="submit"
                    className="absolute bottom-0 right-0"
                    ariaLabel={tH('group.update')}
                >
                    <HiMiniCheck size={24} />
                </DefaultButton>
            )}
        </form>
    );
}
