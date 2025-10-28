import React, { useState } from 'react';

export default function TodoForm({ onSubmit, onCancel, showMessage }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.date) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    const result = await onSubmit(formData);

    if (result.success) {
      showMessage('Todo added successfully!', 'success');
      setFormData({ title: '', description: '', date: '' });
      onCancel(); // Close the form
    } else {
      showMessage(result.error, 'error');
    }
  };

  return (
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
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
