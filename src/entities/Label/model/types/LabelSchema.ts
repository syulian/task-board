export default interface LabelSchema {
    id: string;
    order: number;
    color: string;
    name: string;
    onClick: () => void;
}
