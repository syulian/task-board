import React from 'react';
import { Provider } from 'react-redux';
import { PartialStoryFn } from 'storybook/internal/types';
// eslint-disable-next-line boundaries/element-types
import { RootState, setupStore } from '@app/providers/StoreProvider/config/store';

// eslint-disable-next-line react/display-name
const StoreDecorator = (preloadedState: Partial<RootState>) => (Story: PartialStoryFn) => {
    const store = setupStore(preloadedState);
    return (
        <Provider store={store}>
            <Story />
        </Provider>
    );
};

export default StoreDecorator;
