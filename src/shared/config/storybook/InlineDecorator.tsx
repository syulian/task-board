import { PartialStoryFn } from 'storybook/internal/types';

const InlineDecorator = (Story: PartialStoryFn) => (
    <div
        id="portal-root"
        className="flex items-center justify-center gap-2 relative bg-bg-primary p-8 rounded-lg overflow-hidden"
    >
        <Story />
    </div>
);

export default InlineDecorator;
