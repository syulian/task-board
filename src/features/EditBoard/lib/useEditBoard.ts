import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import BoardSchema from '@entities/Board/model/types/BoardSchema';
import { useDeleteLabel } from '@entities/Label';
import {
    useGetBoardQuery,
    useGetBoardsGroupsQuery,
    useGetLabelsQuery,
    useUpdateBoardMutation,
} from '@shared/types/generated/graphql';

type BoardValues = z.infer<typeof BoardSchema>;

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
        resolver: zodResolver(BoardSchema),
        defaultValues: { name: '', group: { id: 'select', label: 'Select group' } },
    });

    useEffect(() => {
        reset({
            name: board.name,
            group: groups.find(g => g.id === board.groupId),
        });
    }, [board, groups, reset]);

    const handleDelete = async (labelId: string) => {
        await deleteLabel({
            variables: {
                id: labelId,
            },
        });
    };

    const onSubmit = async (data: BoardValues) => {
        await updateBoard({ variables: { id: board.id, name: data.name, groupId: data.group.id } });
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
