import React, { useState, useContext } from 'react';
import { TodoContext } from '../context/Data';

export default function Home() {
  const { todo, loading, error, addTodo, updateTodo, deleteTodo } =
    useContext(TodoContext);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  // Edit states
  const [editingTodo, setEditingTodo] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    date: '',
    completed: false,
  });

  // UI states
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Show message to user
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Handle form submission for adding new todo
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.date) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    const result = await addTodo(formData);

    if (result.success) {
      showMessage('Todo added successfully!', 'success');
      setFormData({ title: '', description: '', date: '' });
      setShowForm(false);
    } else {
      showMessage(result.error, 'error');
    }
  };

  // Handle delete
  const handleDelete = async (todoId) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      const result = await deleteTodo(todoId);

      if (result.success) {
        showMessage('Todo deleted successfully!', 'success');
      } else {
        showMessage(result.error, 'error');
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (todoItem) => {
    setEditingTodo(todoItem._id);
    setEditFormData({
      title: todoItem.title,
      description: todoItem.description,
      date: todoItem.date,
      completed: todoItem.completed,
    });
  };

  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const result = await updateTodo({
      todoId: editingTodo,
      ...editFormData,
    });

    if (result.success) {
      showMessage('Todo updated successfully!', 'success');
      setEditingTodo(null);
      setEditFormData({
        title: '',
        description: '',
        date: '',
        completed: false,
      });
    } else {
      showMessage(result.error, 'error');
    }
  };

  // Handle toggle completion
  const handleToggleComplete = async (todoItem) => {
    const result = await updateTodo({
      todoId: todoItem._id,
      completed: !todoItem.completed,
    });

    if (!result.success) {
      showMessage(result.error, 'error');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading todos...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error fetching todos: {error}</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="header">
        <h1>My Todo App</h1>
        <button className="add-todo-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add New Todo'}
        </button>
      </header>

      {/* Message display */}
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      {/* Add Todo Form */}
      {showForm && (
        <div className="form-container">
          <h3>Add New Todo</h3>
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter todo title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter todo description"
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Due Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Add Todo
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Todo List */}
      <div className="todo-container">
        <h2>Your Todos ({todo.length})</h2>

        {todo.length === 0 ? (
          <div className="no-todos">
            <p>No todos yet. Add one to get started!</p>
          </div>
        ) : (
          <div className="todo-list">
            {todo.map((todoItem) => (
              <div
                key={todoItem._id}
                className={`todo-item ${todoItem.completed ? 'completed' : ''}`}
              >
                {editingTodo === todoItem._id ? (
                  // Edit Form
                  <form onSubmit={handleEditSubmit} className="edit-form">
                    <div className="form-group">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditInputChange}
                        placeholder="Title"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditInputChange}
                        placeholder="Description"
                        rows="2"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <input
                        type="date"
                        name="date"
                        value={editFormData.date}
                        onChange={handleEditInputChange}
                        required
                      />
                    </div>

                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          name="completed"
                          checked={editFormData.completed}
                          onChange={handleEditInputChange}
                        />
                        Completed
                      </label>
                    </div>

                    <div className="edit-actions">
                      <button type="submit" className="save-btn">
                        Save
                      </button>
                      <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => setEditingTodo(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  // Display Todo
                  <>
                    <div className="todo-content">
                      <div className="todo-header">
                        <h3 className="todo-title">{todoItem.title}</h3>
                        <span
                          className={`status ${
                            todoItem.completed ? 'completed' : 'pending'
                          }`}
                        >
                          {todoItem.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>

                      <p className="todo-description">{todoItem.description}</p>

                      <div className="todo-meta">
                        <span className="todo-date">Due: {todoItem.date}</span>
                      </div>
                    </div>

                    <div className="todo-actions">
                      <button
                        className={`toggle-btn ${
                          todoItem.completed ? 'mark-pending' : 'mark-complete'
                        }`}
                        onClick={() => handleToggleComplete(todoItem)}
                      >
                        {todoItem.completed ? 'Mark Pending' : 'Mark Complete'}
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(todoItem)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(todoItem._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
