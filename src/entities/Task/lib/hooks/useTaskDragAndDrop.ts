import useTaskOnOrder from '@entities/Task/lib/hooks/useTaskOnOrder';
import { useTaskDragAndDropContext } from '@entities/Task/model/context/taskDragAndDropContext';
import { IList } from '@entities/Task/model/types/IList';
import { ITask } from '@entities/Task/model/types/ITask';

import { useDragAndDrop } from '@shared/lib';

const useTaskDragAndDrop = (task: ITask, list: IList) => {
    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useTaskDragAndDropContext();
    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = useDragAndDrop(
        list,
        task,
        {
            currentItem,
            setGroups,
            setCurrentItem,
            setCurrentGroup,
            currentGroup,
        },
        useTaskOnOrder(),
    );

    return {
        isDragOver,
        onDragOver,
        onDragLeave,
        onDragStart,
        onDragEnd,
        onDrop,
        currentItem,
    };
};

export default useTaskDragAndDrop;
