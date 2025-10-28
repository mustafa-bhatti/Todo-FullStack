import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/Data';
import Header from './Header';
import Message from './Message';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { LoadingSpinner, ErrorDisplay } from './LoadingAndError';

export default function Home() {
  const { todo, loading, error, addTodo, updateTodo, deleteTodo } =
    useContext(TodoContext);

  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  // Handle form cancellation
  const handleFormCancel = () => {
    setShowForm(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="home-container">
      <Header showForm={showForm} onToggleForm={handleToggleForm} />

      <Message message={message} />

      {showForm && (
        <TodoForm
          onSubmit={addTodo}
          onCancel={handleFormCancel}
          showMessage={showMessage}
        />
      )}

      <TodoList
        todos={todo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
        showMessage={showMessage}
      />
    </div>
  );
}
