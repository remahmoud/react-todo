export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: boolean;
    createdAt: number;
}
export type InitialStateType = {
    todoList: ITodo[];
};
