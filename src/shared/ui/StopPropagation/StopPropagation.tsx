import React, { ReactNode } from 'react';

interface IStopPropagationProps {
    children: ReactNode;
}

function StopPropagation({ children }: IStopPropagationProps) {
    return (
        <div onClick={event => event.stopPropagation()} role="presentation">
            {children}
        </div>
    );
}

export default StopPropagation;
