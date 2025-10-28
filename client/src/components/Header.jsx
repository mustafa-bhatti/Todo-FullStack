import React from 'react';

export default function Header({ showForm, onToggleForm }) {
  return (
    <header className="header">
      <h1>My Todo App</h1>
      <button className="add-todo-btn" onClick={onToggleForm}>
        {showForm ? 'Cancel' : 'Add New Todo'}
      </button>
    </header>
  );
}
