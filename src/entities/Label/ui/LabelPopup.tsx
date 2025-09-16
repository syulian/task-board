import React, { useState } from 'react';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { LabelDragAndDropOrderContext } from '@entities/Label/model/context/labelDragAndDropOrderContext';
import LabelSchema from '@entities/Label/model/types/LabelSchema';
import ColorsDropDown from '@entities/Label/ui/ColorsDropDown';
import LabelControl from '@entities/Label/ui/LabelControl';
import { AddInput, ColorButton, DefaultButton, DropDownContainer } from '@shared/ui';

const colorsList = [
    {
        color: '#d62828',
        onClick: () => {},
    },
    {
        color: '#f77f00',
        onClick: () => {},
    },
    {
        color: '#fcbf49',
        onClick: () => {},
    },
];

export default function LabelPopup() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<LabelSchema | null>(null);

    const [labels, setLabels] = useState<LabelSchema[]>([
        {
            id: '1',
            order: 1,
            color: '#d62828',
            name: 'Important',
            onClick: () => {},
        },
        {
            id: '2',
            order: 2,
            color: '#f77f00',
            name: 'Handy',
            onClick: () => {},
        },
        {
            id: '3',
            order: 3,
            color: '#fcbf49',
            name: 'Nice',
            onClick: () => {},
        },
    ]);

    return (
        <div className="flex justify-center flex-col gap-4 px-8 pb-9">
            <p className="font-bold text-center">Configure Labels</p>
            <div className="flex items-center gap-2 pl-12 pr-4">
                <div className="relative">
                    <ColorButton color={colorsList[0].color} onClick={() => setIsOpen(true)} />
                    <DropDownContainer
                        isOpen={isOpen}
                        setIsOpen={() => setIsOpen(false)}
                        className="left-0 top-full"
                    >
                        <ColorsDropDown />
                    </DropDownContainer>
                </div>
                <AddInput onSubmit={() => {}} placeholder="Type here and press 'Enter'" />
                <DefaultButton onClick={() => {}}>
                    <HiOutlinePlusSmall size={24} />
                </DefaultButton>
            </div>
            <hr className="text-surface-lighter" />
            <LabelDragAndDropOrderContext
                value={{
                    currentOrder: currentOrder,
                    setCurrentOrder: setCurrentOrder,
                    setOrders: setLabels,
                }}
            >
                {labels.map(l => (
                    <LabelControl label={l} key={l.id} />
                ))}
            </LabelDragAndDropOrderContext>
        </div>
    );
}
