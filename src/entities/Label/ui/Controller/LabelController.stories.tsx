import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import LabelController from './LabelController';

const meta: Meta<typeof LabelController> = {
    title: 'Entities/Label/LabelController',
    component: LabelController,
};

export default meta;
type Story = StoryObj<typeof LabelController>;

const Template = () => {
    const { control } = useForm({
        defaultValues: {
            name: '',
            color: '#d62828',
        },
    });

    return <LabelController control={control} />;
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    render: Template,
};
