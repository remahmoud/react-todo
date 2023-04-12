import React, { useId } from "react";
import moment from "moment";
import axios from "axios";
import { useTodo } from "../context/todo";
import * as constant from "../context/constants";
import type { ITodo } from "../types";

export default function TodoItem({ todo }: { todo: ITodo }) {
    const id = useId();
    const { dispatch } = useTodo();
    const handleDeleteTodo = async (id: number) => {
        await axios
            .delete(`/api/todo/${id}`)
            .then(() => dispatch({ type: constant.DELETE_TODO, payload: id }));
    };
    const handleCompleteTodo = async (todo: ITodo) => {
        await axios
            .patch(`/api/todo/${todo.id}`, {
                status: !todo.status,
            })
            .then((res) => {
                dispatch({ type: constant.UPDATE_TODO, payload: res.data });
                dispatch({ type: constant.SORT_DESCENDING });
                dispatch({ type: constant.SORT_UNCOMPLETED });
            });
    };
    return (
        <div className="p-4 flex flex-col gap-2 border border-gray-200 shadow-md rounded-lg">
            <div className="flex items-center">
                <time
                    dateTime={moment(todo.createdAt).format()}
                    className="text-white bg-blue-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                    {moment(todo.createdAt).fromNow()}
                </time>
                <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="ml-auto text-gray-500 hover:text-red-500"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <h2 className="text-2xl">{todo.title}</h2>
            <p className="mb-2">{todo.description}</p>
            <div className="flex items-center">
                <input
                    id={id}
                    type="checkbox"
                    onChange={() => handleCompleteTodo(todo)}
                    checked={todo.status}
                    value={todo.status.toString()}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                    htmlFor={id}
                    className="ml-2 text-sm font-medium text-gray-900"
                >
                    {todo.status === true ? "completed" : "inprogress"}
                </label>
            </div>
        </div>
    );
}
