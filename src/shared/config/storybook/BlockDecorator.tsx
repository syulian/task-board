import { PartialStoryFn } from 'storybook/internal/types';

const BlockDecorator = (Story: PartialStoryFn) => (
    <div className="flex items-center justify-center min-h-50 bg-bg-primary p-8 rounded-lg overflow-hidden">
        <div id="portal-root" className="flex justify-center items-center relative gap-4">
            <Story />
        </div>
    </div>
);

export default BlockDecorator;
