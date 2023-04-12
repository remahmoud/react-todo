import TodoForm from "./TodoForm";
import Search from "./Search";
import SortTodo from "./SortTodo";

export default function Toolbar() {
    return (
        <div className="flex w-full items-center justify-between">
            <SortTodo />
            <Search />
            <TodoForm />
        </div>
    );
}
