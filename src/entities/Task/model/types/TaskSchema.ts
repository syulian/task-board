export interface TaskSchema {
    title: string;
    body: string;
    labels: {
        name: string;
        color: string;
    }[];
}
