"use client";
import styles from "./Session.module.scss";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext } from "@dnd-kit/core";
import Droppable from "../DnD/Droppable";
import Draggable from "../DnD/Draggable";

export const Session = () => {
  const [startSession, setStartSession] = useState(false);
  const [parent, setParent] = useState(null);
  const [draggingItem, setDraggingItem] = useState(null);
  const containers = ["doing", "done", "backlog"];
  const variants = {
    closed: { width: "fit-content", height: "fit-content", left: "1rem" },
    open: { width: 600, height: 600 },
  };

  const [doings, setDoings] = useState([
    "Apple",
    "Banana",
    "Lemon",
    "Pear",
    "Mango",
  ]);
  const [dones, setDones] = useState([]);
  const [backlogs, setBacklogs] = useState([]);

  return (
    <motion.div layout className={styles.sessionLayout}>
      <div>
        <motion.div
          className={styles.session + " box"}
          initial="closed"
          animate={startSession ? "open" : "closed"}
          variants={variants}
          transition={{ ease: "linear", duration: 0.45 }}
        >
          <button onClick={() => setStartSession(!startSession)}>
            {startSession ? "End session" : "Start New Sesssion"}
          </button>
        </motion.div>
      </div>
      <motion.div className={styles.sessionKanban}>
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          id="dnd-id"
        >
          <Droppable id={"doing"} key={1}>
            <h2>Doing</h2>
            {doings.map((doing, key) => (
              <Draggable id={key + doing} key={key} title={doing}>
                {doing}
              </Draggable>
            ))}
          </Droppable>
          <Droppable id={"done"} key={2}>
            <h2>Done</h2>
            {dones.map((done, key) => (
              <Draggable id={done + key} key={key} title={done}>
                {done}
              </Draggable>
            ))}
          </Droppable>
          <Droppable id={"backlog"} key={3}>
            <h2>Backlog</h2>
            {backlogs.map((backlog, key) => (
              <Draggable id={key + backlog} key={key} title={backlog}>
                {backlog}
              </Draggable>
            ))}
          </Droppable>
        </DndContext>
      </motion.div>
    </motion.div>
  );

  function handleDragStart(event) {
    const { active } = event;
    setDraggingItem(active.data.current.title);
  }

  function handleDragEnd(event) {
    console.log(event);
    const { over } = event;

    if (over.id === "doing") {
      setDoings(doings.filter((item) => item !== draggingItem));
      setDones(dones.filter((item) => item !== draggingItem));
      setBacklogs(backlogs.filter((item) => item !== draggingItem));
      setDoings([...doings, draggingItem]);
    }

    if (over.id === "done") {
      setDoings(doings.filter((item) => item !== draggingItem));
      setDones(dones.filter((item) => item !== draggingItem));
      setBacklogs(backlogs.filter((item) => item !== draggingItem));
      setDones([...dones, draggingItem]);
    }

    if (over.id === "backlog") {
      setDoings(doings.filter((item) => item !== draggingItem));
      setDones(dones.filter((item) => item !== draggingItem));
      setBacklogs(backlogs.filter((item) => item !== draggingItem));
      setBacklogs([...backlogs, draggingItem]);
    }

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
};
