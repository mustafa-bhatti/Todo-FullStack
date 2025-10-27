import React from 'react';
import { useContext } from 'react';
import { TodoContext } from '../context/data';
export default function Home() {
  const { todo, loading, error, refetchTodos } = useContext(TodoContext);
  console.log(todo);
  return (
    <div>
      {loading && <h1>Todos are loading</h1>}
      {error && <h1>Eroor fetching todo</h1>}
      <h1>Home</h1>
      <div className='todo-container'>
      </div>
    </div>
  );
}
