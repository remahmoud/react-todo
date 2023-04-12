import React from "react";
import { useTodo } from "../context/todo";
import * as constant from "../context/constants";

export default function SortTodo() {
    const { dispatch } = useTodo();
    const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === "asc") {
            dispatch({ type: constant.SORT_ASCENDING });
        } else if (val === "desc") {
            dispatch({ type: constant.SORT_DESCENDING });
        } else if (val === "completed") {
            dispatch({ type: constant.SORT_COMPLETED });
        } else if (val === "uncompleted") {
            dispatch({ type: constant.SORT_UNCOMPLETED });
        } else {
            return;
        }
    };
    return (
        <select
            onChange={handleSort}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg px-2 py-1 focus:outline-none"
        >
            <option value="desc">Sort by desc</option>
            <option value="asc">Sort by asc</option>
            <option value="completed">Sort by completed</option>
            <option value="uncompleted">Sort by uncompleted</option>
        </select>
    );
}
