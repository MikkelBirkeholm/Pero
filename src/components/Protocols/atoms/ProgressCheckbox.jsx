import React from "react";

export const ProgressCheckbox = async ({
  name,
  className,
  isComplete,
  date,
  currentDate,
  callback,
}) => {
  function handleToggle() {
    callback();
  }
  return (
    <li name={name} className={className}>
      <label htmlFor="">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={handleToggle}
          disabled={date > currentDate ? true : false}
        />
      </label>
    </li>
  );
};
