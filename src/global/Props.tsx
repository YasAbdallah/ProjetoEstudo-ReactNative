export interface AuthContextType{
    taskList: Array<PropCard>;
    onOpen: () => void;
    handleEdit: Function;
    handleDelete: Function;
}

export type PropCard = {
    description: string;
    flag: "urgente" | "opcional";
    item: number;
    title: string;
    timeLimit: Date;
}