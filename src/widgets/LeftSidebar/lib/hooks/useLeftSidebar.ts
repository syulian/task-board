import { useApolloClient } from '@apollo/client/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BoardsGroup } from '@entities/Board';
import { createStateController } from '@shared/lib';
import { useGetBoardsGroupsQuery } from '@shared/types';

const useLeftSidebar = () => {
    const [isOpen, setIsOpen] = useState({
        add: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const { status } = useSession();
    const client = useApolloClient();

    const { data, loading } = useGetBoardsGroupsQuery({ skip: status !== 'authenticated' });
    const [groups, setGroups] = useState<BoardsGroup[]>([]);

    useEffect(() => {
        if (!loading && data?.getBoardsGroups) {
            setGroups(data.getBoardsGroups);
        }
    }, [data, loading]);

    useEffect(() => {
        const handleStore = async () => {
            if (status !== 'authenticated') {
                setGroups([]);
                await client.clearStore();
            }
        };

        handleStore();
    }, [client, status]);

    return {
        groups,
        setGroups,
        setIsOpenField,
        isOpen,
        status,
    };
};

export default useLeftSidebar;
