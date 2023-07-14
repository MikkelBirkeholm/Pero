"use client";
import styles from "./NewTodoForm.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const initialState = {
  title: "",
  description: "",
  due_at: "",
  link: "",
};

export default function NewTodoForm({ callback }) {
  const supabase = createClientComponentClient();
  const [formData, setFormData] = useState(initialState);

  async function createTodo() {
    console.log("formData", formData);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          user_id: session.user.id,
          title: formData.title,
          description: formData.description,
          due_at: formData?.due_at,
          link: formData?.link,
        },
      ])
      .select();
    if (error) console.log("error", error);
  }

  function handleSubmit(e) {
    e.preventDefault();
    createTodo();
    callback();
    setFormData(initialState);
  }

  return (
    <div className={styles.newTodoForm}>
      <h2>New Todo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            tabIndex={1}
          />
        </label>
        <label>
          Description
          <textarea
            type="text"
            name="description"
            value={formData.description}
            tabIndex={2}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          ></textarea>
        </label>
        <label>
          Due
          <input
            type="datetime-local"
            name="due"
            value={formData.due_at}
            tabIndex={3}
            onChange={(e) =>
              setFormData({ ...formData, due_at: e.target.value })
            }
          />
        </label>
        <label>
          Link
          <input
            type="url"
            name="link"
            tabIndex={4}
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
