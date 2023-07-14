import React from "react";

export const TodoModal = ({ todo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      {todo.due && <span>Due: {todo.due}</span>}
      {todo.link && (
        <a href={todo.link} target="_blank">
          Link
        </a>
      )}
    </div>
  );
};
