export interface IFullTask {
    id: string;
    title: string;
    body?: string;
    dueDate: Date;
    complete?: boolean;
    board: {
        id: string;
        name: string;
    };
    list: {
        id: string;
        name: string;
    };
}

export interface IGroupTask {
    date: Date;
    tasks: IFullTask[];
}
