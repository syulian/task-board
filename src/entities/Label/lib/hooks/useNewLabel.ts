import { useMutation } from '@apollo/client/react';
import { CREATE_LABEL } from '@entities/Label/api/createLabel';
import { GET_LABELS } from '@entities/Label/api/getLabels';
import ILabel from '@entities/Label/model/types/ILabel';

const useNewLabel = (boardId?: string) => {
    const [newLabel, { loading: createLabelLoading }] = useMutation<{ createLabel: ILabel }>(
        CREATE_LABEL,
        {
            update(cache, { data }) {
                if (!boardId || !data) return;

                const existing = cache.readQuery<{ getLabels: ILabel[] }>({
                    query: GET_LABELS,
                    variables: { boardId },
                });

                if (!existing) return;

                cache.writeQuery<{ getLabels: ILabel[] }>({
                    query: GET_LABELS,
                    variables: { boardId },
                    data: {
                        getLabels: [...existing.getLabels, data.createLabel],
                    },
                });
            },
        },
    );

    return {
        newLabel,
        createLabelLoading,
    };
};

export default useNewLabel;
