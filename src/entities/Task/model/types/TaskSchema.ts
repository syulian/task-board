export interface TaskSchema {
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
