import { IList, ITask, useTaskDragAndDropContext } from '@entities/Task';
import useTaskOnOrder from '@entities/Task/lib/hooks/useTaskOnOrder';
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
