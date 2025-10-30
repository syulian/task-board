import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FieldError, useForm } from 'react-hook-form';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import FormField from './FormField';

const meta: Meta<typeof FormField> = {
    title: 'Shared/Input/FormField',
    component: FormField,
};

export default meta;
type Story = StoryObj<typeof FormField>;

const Template = (args: { label: string; placeholder?: string; error?: FieldError }) => {
    const {
        register,
        formState: { errors },
    } = useForm({
        defaultValues: { email: '' },
    });

    return (
        <FormField {...args} name="email" register={register} error={args.error ?? errors.email} />
    );
};

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        label: 'Name',
        placeholder: 'Email...',
    },
    render: Template,
};

export const Error: Story = {
    decorators: [InlineDecorator],
    args: {
        label: 'Name',
        placeholder: 'Email...',
        error: {
            type: 'error',
            message: 'Something went wrong',
        },
    },
    render: Template,
};
