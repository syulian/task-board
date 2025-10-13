import { gql } from 'graphql-tag';
import { GetLabelsQuery, useCreateLabelMutation } from '@shared/types/generated/graphql';

const GET_LABELS = gql`
    query GetLabels($boardId: ID!) {
        getLabels(boardId: $boardId) {
            id
            order
            name
            color
            board
        }
    }
`;

const useNewLabel = (boardId?: string) => {
    const [newLabel, { loading: createLabelLoading }] = useCreateLabelMutation({
        update(cache, { data }) {
            if (!boardId || !data) return;

            const existing = cache.readQuery<GetLabelsQuery>({
                query: GET_LABELS,
                variables: { boardId },
            });

            if (!existing) return;

            cache.writeQuery({
                query: GET_LABELS,
                variables: { boardId },
                data: {
                    getLabels: [...existing.getLabels, data.createLabel],
                },
            });
        },
    });

    return {
        newLabel,
        createLabelLoading,
    };
};

export default useNewLabel;
