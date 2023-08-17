import { DeleteButton } from "./DeleteButton";
import styles from "./TodoCard.module.scss";
import { motion } from "framer-motion";

export const TodoCardCompleted = ({ todo, callback, deleteCallback }) => {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
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
    </motion.div>
  );
};
