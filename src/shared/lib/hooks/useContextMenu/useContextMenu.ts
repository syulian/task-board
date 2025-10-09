'use client';
import { MouseEvent, useState } from 'react';
import { createStateController } from '@shared/lib';

const useContextMenu = () => {
    const [menu, setMenu] = useState({
        state: false,
        coordinates: {
            x: 0,
            y: 0,
        },
    });
    const setField = createStateController<typeof menu>(setMenu);

    const onContextMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();

        setField('coordinates', { x: event.clientX, y: event.clientY });
        setField('state', !menu.state);
    };

    return {
        menu,
        setMenu,
        setField,
        onContextMenu,
    };
};

export default useContextMenu;
