export interface TaskSchema {
    id: string;
    order: number;
    title: string;
    body: string;
    attachments?: {
        type: string;
        value: string;
        checked: boolean;
    }[];
    labels: {
        name: string;
        color: string;
    }[];
}
