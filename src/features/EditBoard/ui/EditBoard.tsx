import React from 'react';
import { Controller } from 'react-hook-form';
import { HiMiniCheck } from 'react-icons/hi2';
import useEditBoard from '@features/EditBoard/lib/useEditBoard';
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

    return (
        <form
            className="flex justify-center flex-col gap-6 px-8 pb-9 w-112 relative"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormField
                register={register}
                name="name"
                error={errors.name}
                placeholder="Enter board name"
                label="Board Name"
            />
            <span className="flex justify-between items-center w-full">
                <b>Group</b>
                <Controller
                    control={control}
                    name="group"
                    render={({ field }) => (
                        <Select list={groups} selected={field.value} setSelected={field.onChange} />
                    )}
                />
            </span>
            <hr className="text-bg-neutral-lighter" />
            <b>Labels</b>
            <div className="flex flex-wrap gap-2">
                <SecondButton onClick={openLabelPopup}>Configure Labels</SecondButton>
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
                <DefaultButton type="submit" className="absolute bottom-0 right-0">
                    <HiMiniCheck size={24} />
                </DefaultButton>
            )}
        </form>
    );
}
