import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FieldError, useForm } from 'react-hook-form';
import InlineDecorator from '../../config/storybook/InlineDecorator';
import Textarea from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Shared/Textarea/Textarea',
    component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const Template = (args: { ariaLabel: string; placeholder?: string; error?: FieldError }) => {
    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { description: '' },
    });

    return (
        <Textarea
            {...args}
            name="description"
            register={register}
            error={args.error ?? errors.description}
        />
    );
};

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Textarea',
        placeholder: 'Description...',
    },
    render: Template,
};

export const Error: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Textarea',
        placeholder: 'Description...',
        error: {
            type: 'error',
            message: 'Something went wrong',
        },
    },
    render: Template,
};
