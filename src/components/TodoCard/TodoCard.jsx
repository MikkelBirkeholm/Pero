import { DeleteButton } from "./DeleteButton";
import styles from "./TodoCard.module.scss";
import { useRef } from "react";
import { motion } from "framer-motion";

export const TodoCard = ({ todo, callback, deleteCallback }) => {
  const ref = useRef(null);

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <div>
        <div className={styles.cardHeader}>
          <DeleteButton callback={() => deleteCallback(todo.id)} />
        </div>
        <h2>
          <input
            type="checkbox"
            checked={todo.is_complete}
            onChange={() => callback(todo.id, !todo.is_complete)}
          />
          {todo.title}
        </h2>
        <p>{todo.description}</p>
        {todo.due && <span>Due: {todo.due}</span>}
        {todo.link && (
          <a href={todo.link} target="_blank">
            Link
          </a>
        )}
      </div>
      <div>
        <button onClick={() => ref.current.showModal()}>Open</button>
      </div>
      <dialog ref={ref}>
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        {todo.due && <span>Due: {todo.due}</span>}
        {todo.link && (
          <a href={todo.link} target="_blank">
            Link
          </a>
        )}
        <button
          onClick={() => {
            ref.current.close();
          }}
        >
          Close
        </button>
      </dialog>
    </motion.div>
  );
};
