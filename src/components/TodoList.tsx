import axios from "axios";
import { useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTodo } from "../context/todo";
import * as constant from "../context/constants";
import TodoItem from "./TodoItem";
import type { ITodo } from "../types";

export default function TodoList() {
    const [parent] = useAutoAnimate({ duration: 400 });
    const {
        state: { todoList },
        dispatch,
    } = useTodo();
    useEffect(() => {
        const fetchTodo = async () => {
            await axios.get<ITodo[]>("/api/todo").then((res) => {
                dispatch({
                    type: constant.SET_TODO_LIST,
                    payload: res.data,
                });
                dispatch({
                    type: constant.SORT_DESCENDING,
                    payload: res.data,
                });
            });
        };
        fetchTodo();
    }, []);
    return todoList ? (
        <div className="flex flex-col gap-4" ref={parent}>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
        </div>
    ) : null;
}
