import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { PartialStoryFn } from 'storybook/internal/types';

// eslint-disable-next-line react/display-name
const SessionDecorator = (session: SessionProviderProps['session']) => (Story: PartialStoryFn) => (
    <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
        <Story />
    </SessionProvider>
);

export default SessionDecorator;
