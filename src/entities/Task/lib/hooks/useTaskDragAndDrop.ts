import useTaskOnOrder from '@entities/Task/lib/hooks/useTaskOnOrder';
import { useTaskDragAndDropContext } from '@entities/Task/model/context/taskDragAndDropContext';
import Task from '@entities/Task/model/types/Task';
import TasksList from '@entities/Task/model/types/TasksList';

import { useDragAndDrop } from '@shared/lib';

const useTaskDragAndDrop = (task: Task, list: TasksList) => {
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
        useTaskOnOrder(list.board),
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
