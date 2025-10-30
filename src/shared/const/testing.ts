import {
    CreateBoardDocument,
    CreateBoardsGroupDocument,
    GetBoardDocument,
    GetGroupedTasksDocument,
    GetLabelsDocument,
    GetListsDocument,
    GetTasksDocument,
} from '@shared/types';

const BOARD_ID = '68ed5870f58a0f241c876682';
const GROUP_ID = '68ed5aecf58a0f241c876731';

const SESSION = {
    user: {
        name: 'Test User',
        email: 'test@gmail.com',
    },
    expires: '2099-12-31T23:59:59.999Z',
};

const LABELS = [
    {
        id: '68ed59c5f58a0f241c876705',
        order: 0,
        name: 'Important',
        color: '#d62828',
        board: BOARD_ID,
    },
];

const SUBTASKS = [
    {
        id: '68fb6fd1b21aa0928b3f34c9',
        order: 0,
        value: 'imports',
        checked: false,
    },
    {
        id: '68fb6fd1b21aa0928b3f34ca',
        order: 1,
        value: 'types',
        checked: true,
    },
];

const TASKS = [
    {
        id: '68f0ec86caffecf2f10b9b38',
        order: 0,
        title: 'Task title',
        complete: true,
        dueDate: '2025-10-21T01:21:00.000Z',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, placeat.',
        list: '68ed587af58a0f241c876691',
        subtasks: SUBTASKS,
        labels: [LABELS[0]],
    },
];

const LISTS = [
    {
        id: '68ed587af58a0f241c876691',
        order: 0,
        name: 'To do',
        color: '#d62828',
        board: BOARD_ID,
        items: TASKS,
    },
    {
        id: '68ed587df58a0f241c876697',
        order: 1,
        name: 'Doing',
        color: '#fcbf49',
        board: BOARD_ID,
        items: [],
    },
    {
        id: '68ed5884f58a0f241c87669e',
        order: 2,
        name: 'Done',
        color: '#6a994e',
        board: BOARD_ID,
        items: [],
    },
];

const GROUPED_TASKS = [
    {
        date: '2025-10-29T00:00:00.000Z',
        tasks: [
            {
                id: '68f0ec86caffecf2f10b9b38',
                title: 'Task title',
                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, placeat.',
                dueDate: '2025-10-29T10:30:00.000Z',
                complete: true,
                board: {
                    id: BOARD_ID,
                    name: 'Task Board',
                },
                list: {
                    id: '68ed587df58a0f241c876697',
                    name: 'Doing',
                },
            },
        ],
    },
];

const FULL_BOARD = [
    {
        id: BOARD_ID,
        order: 1,
        name: 'Task Board',
        groupId: GROUP_ID,
        listsCount: 3,
        tasksCount: 5,
    },
];

const MOCKS = [
    {
        request: {
            query: GetListsDocument,
            variables: { boardId: BOARD_ID },
        },
        result: {
            data: {
                getLists: LISTS,
            },
        },
    },
    {
        request: {
            query: GetGroupedTasksDocument,
        },
        result: {
            data: {
                getGroupedTasks: GROUPED_TASKS,
            },
        },
    },
    {
        request: {
            query: GetBoardDocument,
            variables: { id: BOARD_ID },
        },
        result: {
            data: {
                getBoard: FULL_BOARD,
            },
        },
    },
    {
        request: {
            query: GetLabelsDocument,
            variables: { boardId: BOARD_ID },
        },
        result: {
            data: {
                getLabels: LABELS,
            },
        },
    },
    {
        request: {
            query: CreateBoardsGroupDocument,
            variables: { name: 'Test Group', order: 1 },
        },
        result: {
            data: {
                createBoard: { id: '1', name: 'Test Group' },
            },
        },
    },
    {
        request: {
            query: CreateBoardDocument,
            variables: { name: 'Test Board', order: 1, groupId: GROUP_ID },
        },
        result: {
            data: {
                createBoard: { id: '1', name: 'Test Board' },
            },
        },
    },
    {
        request: {
            query: GetTasksDocument,
            variables: {
                filters: [],
                labels: [LABELS[0].id],
                search: '',
                boardId: BOARD_ID,
            },
        },
        result: {
            data: {
                getTasks: TASKS,
            },
        },
    },
];

const ERROR_MOCKS = [
    {
        request: {
            query: CreateBoardsGroupDocument,
            variables: { name: 'Fail Group', order: 1 },
        },
        error: new Error('Network error'),
    },
    {
        request: {
            query: CreateBoardDocument,
            variables: { name: 'Fail Board', order: 1, groupId: GROUP_ID },
        },
        error: new Error('Network error'),
    },
];

export {
    BOARD_ID,
    GROUP_ID,
    SESSION,
    LABELS,
    SUBTASKS,
    TASKS,
    LISTS,
    GROUPED_TASKS,
    MOCKS,
    ERROR_MOCKS,
};
