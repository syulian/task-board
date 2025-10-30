import { MockedProvider, MockedProviderProps } from '@apollo/client/testing/react';
import { PartialStoryFn } from 'storybook/internal/types';

// eslint-disable-next-line react/display-name
const ApolloDecorator = (mocks: MockedProviderProps['mocks']) => (Story: PartialStoryFn) => (
    <MockedProvider mocks={mocks}>
        <Story />
    </MockedProvider>
);

export default ApolloDecorator;
