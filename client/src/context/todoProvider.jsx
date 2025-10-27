import react, { useState, useEffect } from 'react';
import { TodoContext } from './data';

export function TodoProvider({ children }) {
  const [todo, setTodo] = useState({
    data: [],
    loading: true,
    error: null,
  });
  const fetchData = async function () {
    try {
      setTodo((prev) => ({ ...prev, loading: true, error: null }));

      const response = await fetch('http://localhost:5002/api/v1/get/todo');
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
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
