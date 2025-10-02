import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { IBoardsGroup, GET_BOARDS_GROUPS, GET_BOARD, IBoard, UPDATE_BOARD } from '@entities/Board';
import BoardSchema from '@entities/Board/model/types/BoardSchema';
import { GET_LABELS, ILabel, useDeleteLabel } from '@entities/Label';

type BoardValues = z.infer<typeof BoardSchema>;

const useEditBoard = () => {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const { data: dataLabels } = useQuery<{ getLabels: ILabel[] }>(GET_LABELS, {
        variables: { boardId },
    });
    const { data: dataGroups } = useQuery<{ getBoardsGroups: IBoardsGroup[] }>(GET_BOARDS_GROUPS);
    const { data: dataBoard } = useQuery<{ getBoard: IBoard }>(GET_BOARD, {
        variables: { boardId },
    });
    const [updateBoard] = useMutation(UPDATE_BOARD, { refetchQueries: ['GetBoardsGroups'] });
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
        await updateBoard({ variables: { id: boardId, name: data.name, groupId: data.group.id } });
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
