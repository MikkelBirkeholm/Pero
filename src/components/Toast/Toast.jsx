"use client";
import React from "react";

export const Toast = ({ content, type, callback, callbackDelete }) => {
  return (
    <div className={"toast " + type}>
      <span>Icon</span>
      <div>
        <h2>{type}</h2>
        <p>Description</p>
      </div>
      <button onClick={(e) => e.currentTarget.parentNode.remove()}>
        Close
      </button>
    </div>
  );
};
