import React from 'react';

export default function Message({ message }) {
  if (!message.text) return null;

  return <div className={`message ${message.type}`}>{message.text}</div>;
}
