import TodoList from "./components/TodoList";
import TodoProvider from "./context/todo";
import Toolbar from "./components/Toolbar";

function App() {
    return (
        <TodoProvider>
            <div className="max-w-[50%] mx-auto flex flex-col gap-4 items-center mb-4">
                <h1 className="text-6xl font-bold text-center my-16">
                    Welcome to todo
                </h1>
                <Toolbar />
                <TodoList />
            </div>
        </TodoProvider>
    );
}

export default App;
