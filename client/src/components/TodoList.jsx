import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onUpdate, onDelete, showMessage }) {
  return (
    <div className="todo-container">
      <h2>Your Todos ({todos.length})</h2>

      {todos.length === 0 ? (
        <div className="no-todos">
          <p>No todos yet. Add one to get started!</p>
        </div>
      ) : (
        <div className="todo-list">
          {todos.map((todoItem) => (
            <TodoItem
              key={todoItem._id}
              todoItem={todoItem}
              onUpdate={onUpdate}
              onDelete={onDelete}
              showMessage={showMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
