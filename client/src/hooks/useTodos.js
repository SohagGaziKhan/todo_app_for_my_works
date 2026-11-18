import { useState, useEffect, useCallback } from "react";
import { todoApi } from "../services/api";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all | active | completed

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter === "active") params.completed = false;
      if (filter === "completed") params.completed = true;

      const res = await todoApi.getAll(params);
      setTodos(res.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load todos. Is the server running?"
      );
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todoData) => {
    try {
      const res = await todoApi.create(todoData);
      setTodos((prev) => [res.data.data, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add todo");
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const res = await todoApi.update(id, { completed: !completed });
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
    }
  };

  const editTodo = async (id, updates) => {
    try {
      const res = await todoApi.update(id, updates);
      setTodos((prev) =>
        prev.map((t) => (t._id === id ? res.data.data : t))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update todo");
    }
  };

  const removeTodo = async (id) => {
    try {
      await todoApi.delete(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete todo");
    }
  };

  return {
    todos,
    loading,
    error,
    filter,
    setFilter,
    addTodo,
    toggleComplete,
    editTodo,
    removeTodo,
    refetch: fetchTodos,
  };
}
