import React, { useRef, useState } from "react";
import axios from "axios";
import { useTodo } from "../context/todo";
import * as constant from "../context/constants";

export default function TodoForm() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const { dispatch } = useTodo();
    // create new todo handler
    const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.currentTarget).entries()
        );
        await axios
            .post(
                "/api/todo",
                {
                    ...data,
                    id: new Date().valueOf(),
                    status: false,
                    createdAt: Date.now(),
                },
                {
                    method: "POST",
                }
            )
            .then((res) => {
                dispatch({ type: constant.ADD_TODO, payload: res.data });
                (e.target as HTMLFormElement).reset();
                setIsOpen(false);
            });
    };
    return (
        <div>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="bg-blue-700 text-white px-2 py-1 rounded-md text-sm"
            >
                Add Todo
            </button>
            {isOpen ? (
                <form
                    ref={formRef}
                    className="fixed inset-0 z-50 h-screen w-full bg-gray-900/50 flex justify-center items-center overflow-x-hidden overflow-y-auto"
                    onSubmit={handleCreateTodo}
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl h-auto w-96 p-6 mx-auto max-w-5xl bg-white flex flex-col gap-4"
                    >
                        <h4 className="text-3xl text-blue-700 text-center font-semibold">
                            Create new todo
                        </h4>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            className="input"
                        />
                        <textarea
                            rows={4}
                            name="description"
                            placeholder="Description"
                            className="input resize-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-700 text-white py-1.5 rounded-md"
                        >
                            create
                        </button>
                    </div>
                </form>
            ) : null}
        </div>
    );
}
