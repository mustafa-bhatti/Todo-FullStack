import React, { useState, useEffect } from 'react';
import { TodoContext } from './Data';

const API_BASE_URL = 'http://localhost:5002/api/v1';

export function TodoProvider({ children }) {
  const [todo, setTodo] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const fetchData = async function () {
    try {
      setTodo((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch(`${API_BASE_URL}/get/todo`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setTodo({
        data: data.todo || data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodo((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  };

  const addTodo = async (todoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/create/todo/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to add todo');
      }

      // Refetch todos after successful addition
      await fetchData();
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Error adding todo:', error);
      return { success: false, error: error.message };
    }
  };

  const updateTodo = async (todoData) => {
    try {
      console.log(todoData);
      console.log(JSON.stringify(todoData));
      const response = await fetch(`${API_BASE_URL}/update/todo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update todo');
      }

      // Refetch todos after successful update
      await fetchData();
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Error updating todo:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/todo/${todoId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete todo');
      }

      // Refetch todos after successful deletion
      await fetchData();
      return { success: true, message: result.message };
    } catch (error) {
      console.error('Error deleting todo:', error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchTodos = () => {
    fetchData();
  };

  return (
    <TodoContext.Provider
      value={{
        todo: todo.data,
        loading: todo.loading,
        error: todo.error,
        refetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
