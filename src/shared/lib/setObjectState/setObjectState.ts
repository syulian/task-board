import { Dispatch, SetStateAction } from 'react';

export function createStateController<T extends object>(setState: Dispatch<SetStateAction<T>>) {
    return <K extends keyof T>(field: K, state: T[K]) => {
        setState(prev => ({
            ...prev,
            [field]: state,
        }));
    };
}
