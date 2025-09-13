import { Dispatch, SetStateAction } from 'react';

export function createStateController<T extends object>(setState: Dispatch<SetStateAction<T>>) {
    return (field: keyof T, state: boolean) => {
        setState(prev => ({
            ...prev,
            [field]: state,
        }));
    };
}
