import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="loading-container">
      <h2>Loading todos...</h2>
    </div>
  );
}

export function ErrorDisplay({ error }) {
  return (
    <div className="error-container">
      <h2>Error fetching todos: {error}</h2>
    </div>
  );
}
