import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

export default function App() {
  const {
    todos,
    loading,
    error,
    filter,
    setFilter,
    addTodo,
    toggleComplete,
    editTodo,
    removeTodo,
  } = useTodos();

  const activeCount = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">My Todos</h1>
        <p className="text-gray-500 mb-6">
          {loading ? "Loading..." : `${activeCount} task(s) left`}
        </p>

        <TodoForm onAdd={addTodo} />

        <Filter current={filter} onChange={setFilter} />

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading tasks...</p>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleComplete}
            onEdit={editTodo}
            onDelete={removeTodo}
          />
        )}
      </div>
    </div>
  );
}
