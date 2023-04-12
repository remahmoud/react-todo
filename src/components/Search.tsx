import axios from "axios";
import React from "react";
import { useTodo } from "../context/todo";
import * as constant from "../context/constants";

export default function Search() {
    const { dispatch } = useTodo();
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        await axios
            .get("/api/todo?title_like=" + e.target.value)
            .then((res) => {
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
    return (
        <input
            type="text"
            className="input w-[30%] py-1"
            placeholder="Search todo"
            onChange={handleSearch}
        />
    );
}
