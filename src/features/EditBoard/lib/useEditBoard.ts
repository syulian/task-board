import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { EditBoardSchema } from '@entities/Board';
import { useDeleteLabel } from '@entities/Label';
import {
    useGetBoardQuery,
    useGetBoardsGroupsQuery,
    useGetLabelsQuery,
    useUpdateBoardMutation,
} from '@shared/types';

type BoardValues = z.infer<typeof EditBoardSchema>;

const useEditBoard = () => {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const { data: dataLabels } = useGetLabelsQuery({
        variables: { boardId: boardId ?? '' },
        skip: !boardId,
    });
    const { data: dataGroups } = useGetBoardsGroupsQuery();
    const { data: dataBoard } = useGetBoardQuery({
        variables: { id: boardId ?? '' },
        skip: !boardId,
    });
    const [updateBoard] = useUpdateBoardMutation({ refetchQueries: ['GetBoardsGroups'] });
    const { deleteLabel } = useDeleteLabel();

    const labels = dataLabels?.getLabels ?? [];
    const board = useMemo(
        () =>
            dataBoard?.getBoard ?? {
                id: '',
                name: '',
                groupId: '',
            },
        [dataBoard?.getBoard],
    );
    const groups = useMemo(
        () =>
            dataGroups?.getBoardsGroups.map(g => ({
                id: g.id,
                label: g.name,
            })) ?? [],
        [dataGroups?.getBoardsGroups],
    );

    const {
        reset,
        control,
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(EditBoardSchema),
        defaultValues: { name: '', group: { id: 'select', label: 'Select group' } },
    });

    useEffect(() => {
        reset({
            name: board.name,
            group: groups.find(g => g.id === board.groupId),
        });
    }, [board, groups, reset]);

    const handleDelete = async (labelId: string) => {
        try {
            await deleteLabel({
                variables: {
                    id: labelId,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const onSubmit = async (data: BoardValues) => {
        try {
            await updateBoard({
                variables: { id: board.id, name: data.name, groupId: data.group.id },
            });
        } catch (e) {
            console.log(e);
        }
    };

    return {
        handleSubmit,
        onSubmit,
        register,
        errors,
        control,
        groups,
        labels,
        handleDelete,
        isDirty,
    };
};
export default useEditBoard;
