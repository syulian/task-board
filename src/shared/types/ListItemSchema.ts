import { ReactNode } from 'react';

export default interface ListItemSchema {
    title?: string;
    children: {
        label: ReactNode;
        onClick: () => void;
    }[];
}
