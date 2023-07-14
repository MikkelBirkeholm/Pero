import styles from "./TodoCard.module.scss";

export const TodoCardCompleted = ({ todo, callback, deleteCallback }) => {
  return (
    <div className={styles.card}>
      <button onClick={() => deleteCallback(todo.id)}>Delete</button>
      <h2>
        <input
          type="checkbox"
          checked={todo.is_complete}
          onChange={() => callback(todo.id, !todo.is_complete)}
        />
        {todo.title}
      </h2>
      <p>{todo.description}</p>
    </div>
  );
};
