import { Reference } from '@apollo/client';
import { useDeleteLabelMutation } from '@shared/types';

const useDeleteLabel = () => {
    const [deleteLabel] = useDeleteLabelMutation({
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
