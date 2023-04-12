import {
    useContext,
    useReducer,
    createContext,
    ReactNode,
    FC,
    Dispatch,
} from "react";
import * as constant from "./constants";
import type { ITodo, InitialStateType } from "../types";

// initial state for context
const initialState: InitialStateType = {
    todoList: [],
};

// Create Todo Context
const TodoContext = createContext<{
    state: InitialStateType;
    dispatch: Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

// sort functions
// sort completed todo
const sortByCompleted = (a: ITodo, b: ITodo) => {
    return a.status > b.status ? -1 : 1;
};
// sort uncompleted todo
const sortByNonCompleted = (a: ITodo, b: ITodo) => {
    return a.status < b.status ? -1 : 1;
};
// sort by date in desc
const sortByDateDesc = (a: ITodo, b: ITodo) => {
    return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
};
// sort by date in Asc
const sortByDateAsc = (a: ITodo, b: ITodo) => {
    return new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1;
};

// Context reducer
const reducer = (state: InitialStateType, action: any) => {
    switch (action.type) {
        // Add New Todo
        case constant.ADD_TODO:
            return { ...state, todoList: [action.payload, ...state.todoList] };
        // Get Todo List
        case constant.SET_TODO_LIST:
            return {
                ...state,
                todoList: action.payload,
            };
        // Update Todo By Id
        case constant.UPDATE_TODO:
            return {
                ...state,
                todoList: state.todoList.map((x: any) =>
                    x.id === action.payload.id ? action.payload : x
                ),
            };
        // Delete Todo By Id
        case constant.DELETE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter(
                    (x: any) => x.id !== action.payload
                ),
            };
        // Sort Todo List by completed status
        case constant.SORT_COMPLETED:
            return {
                ...state,
                todoList: state.todoList.sort(sortByCompleted),
            };
        // Sort Todo List by uncompleted status
        case constant.SORT_UNCOMPLETED:
            return {
                ...state,
                todoList: state.todoList.sort(sortByNonCompleted),
            };
        // Sort Todo List by Ascending
        case constant.SORT_ASCENDING:
            return {
                ...state,
                todoList: state.todoList.sort(sortByDateAsc),
            };
        // Sort Todo List by Descending
        case constant.SORT_DESCENDING:
            return {
                ...state,
                todoList: state.todoList.sort(sortByDateDesc),
            };
        default:
            return state;
    }
};

// Context Provider
const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TodoContext.Provider value={{ state, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

// Hook to use context
export const useTodo = () => {
    return useContext(TodoContext);
};
export default TodoProvider;
