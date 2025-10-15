import { GetLabelsDocument, GetLabelsQuery, useCreateLabelMutation } from '@shared/types';

const useNewLabel = (boardId?: string) => {
    const [newLabel, { loading: createLabelLoading }] = useCreateLabelMutation({
        update(cache, { data }) {
            if (!boardId || !data) return;

            const existing = cache.readQuery<GetLabelsQuery>({
                query: GetLabelsDocument,
                variables: { boardId },
            });

            if (!existing) return;

            cache.writeQuery({
                query: GetLabelsDocument,
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
