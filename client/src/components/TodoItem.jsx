import React, { useState } from 'react';

export default function TodoItem({
  todoItem,
  onUpdate,
  onDelete,
  showMessage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: todoItem.title,
    description: todoItem.description,
    date: todoItem.date,
    completed: todoItem.completed,
  });

  // Handle edit form input changes
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true);
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

    const result = await onUpdate({
      todoId: todoItem._id,
      ...editFormData,
    });

    if (result.success) {
      showMessage('Todo updated successfully!', 'success');
      setIsEditing(false);
    } else {
      showMessage(result.error, 'error');
    }
  };

  // Handle toggle completion
  const handleToggleComplete = async () => {
    console.log(todoItem._id, todoItem.completed);
    let tempComplete = !todoItem.completed;
    const result = await onUpdate({
      todoId: todoItem._id,
      completed: tempComplete,
    });

    if (!result.success) {
      showMessage(result.error, 'error');
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      const result = await onDelete(todoItem._id);

      if (result.success) {
        showMessage('Todo deleted successfully!', 'success');
      } else {
        showMessage(result.error, 'error');
      }
    }
  };

  return (
    <div className={`todo-item ${todoItem.completed ? 'completed' : ''}`}>
      {isEditing ? (
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
              onClick={() => setIsEditing(false)}
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
              onClick={handleToggleComplete}
            >
              {todoItem.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>

            <button className="edit-btn" onClick={handleEditClick}>
              Edit
            </button>

            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
