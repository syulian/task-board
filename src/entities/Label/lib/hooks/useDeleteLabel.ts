import { Reference } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { DELETE_LABEL } from '@entities/Label/api/deleteLabel';

const useDeleteLabel = () => {
    const [deleteLabel] = useMutation<{ deleteLabel: string }>(DELETE_LABEL, {
        update(cache, { data }) {
            if (!data) return;

            cache.modify({
                fields: {
                    getLabels(existingRefs: readonly Reference[] = [], { readField }) {
                        return existingRefs.filter(
                            ref => readField('id', ref) !== data.deleteLabel,
                        );
                    },
                },
            });
        },
    });

    return { deleteLabel };
};

export default useDeleteLabel;
