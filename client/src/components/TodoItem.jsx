import { useState } from "react";

const priorityColors = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-brand-light/20 text-brand-dark",
  high: "bg-red-100 text-red-600",
};

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onEdit(todo._id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  return (
    <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        className="w-5 h-5 accent-brand cursor-pointer"
      />

      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`flex-1 cursor-text ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </span>
      )}

      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${priorityColors[todo.priority]}`}
      >
        {todo.priority}
      </span>

      <button
        onClick={() => setIsEditing(true)}
        className="text-sm text-brand hover:text-brand-dark"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(todo._id)}
        className="text-sm text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
