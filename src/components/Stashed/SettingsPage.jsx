"use client";
import NewTodoForm from "@/components/NewTodoForm/NewTodoForm";
import styles from "./page.module.scss";
import { TodoCard } from "@/components/TodoCard/TodoCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { TodoCardCompleted } from "@/components/TodoCard/TodoCardCompleted";
import { AnimatePresence } from "framer-motion";

const revalidate = 0;

export default function Page({ params }) {
  const todomodal = document.getElementById("todomodal");
  const supabase = createClientComponentClient();
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  async function getTodos() {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("is_complete", false);

    if (error) console.log("error", error);
    else setTodos(todos);
  }

  async function getCompletedTodos() {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("*")
      .eq("is_complete", true);

    if (error) console.log("error", error);
    else setCompletedTodos(todos);
  }

  useEffect(() => {
    updateTodos();
  }, []);

  function updateTodos() {
    getTodos();
    getCompletedTodos();
  }

  async function handleComplete(id, status) {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: status })
      .eq("id", id);
    if (error) console.log("error", error);
    else {
      updateTodos();
    }
  }

  async function handleDelete(id) {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) console.log("error", error);
    else {
      updateTodos();
    }
  }

  return (
    <div className={styles.userDashboard}>
      <div className={styles.sidebar}>
        <NewTodoForm callback={updateTodos} />
        <div className="box">
          <h2>Session</h2>
          <button>New Session</button>
        </div>
      </div>
      <div className={styles.mainContent}>
        <h3>To do's</h3>
        <AnimatePresence>
          <div className={styles.todoWrapper} key={"div1"}>
            {todos.map((todo) => (
              <TodoCard
                key={todo.id}
                todo={todo}
                callback={handleComplete}
                deleteCallback={handleDelete}
              />
            ))}
          </div>
          <h3>Completed</h3>
          <div className={styles.todoWrapper} key={"div2"}>
            {completedTodos.map((todo) => (
              <TodoCardCompleted
                key={todo.id}
                todo={todo}
                callback={handleComplete}
                deleteCallback={handleDelete}
              />
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
