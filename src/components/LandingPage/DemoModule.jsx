"use client";
import React from "react";
import styles from "./Styles.module.scss";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FakeButton } from "./FakeButton";

export const DemoModule = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeProtocols, setActiveProtocols] = React.useState([]);
  const [demoProtocols, setDemoProtocols] = React.useState([
    {
      id: "1",
      title:
        "Sleep Supplement: 145mg Magnesium Threonate or 200mg Magnesium Bisglycinate",
      categories: "Supplements",
      benefits: "Better sleep quality",
    },
    {
      id: "2",
      title: "Avoid caffeine within 8-10 hours of bedtime",
      categories: "Sleep",
      benefits: "Fall asleep easier",
    },
    {
      id: "3",
      title:
        "Wake up at the same time each day and go to sleep when you first start to feel sleepy",
      categories: "Sleep",
      benefits: "Correct circadian rythm",
    },
    {
      id: "4",
      title: "View sunlight by going outside within 30-60 minutes of waking up",
      categories: "Sleep",
      benefits: "Correct circadian rythm",
    },
  ]);

  const handleAdd = (protocol) => {
    setDemoProtocols(demoProtocols.filter((item) => item.id !== protocol.id));
    setActiveProtocols([...activeProtocols, protocol]);
    console.log("added");
  };

  const handleRemove = (protocol) => {
    setActiveProtocols(
      activeProtocols.filter((item) => item.id !== protocol.id),
    );
    setDemoProtocols([...demoProtocols, protocol]);
    console.log("removed");
  };

  return (
    <div className={styles.DemoModule} ref={ref}>
      <div className={styles.demoGridWrapper}>
        <div>
          <h2>Suggested Protocols</h2>
          <div className={styles.demoGrid}>
            <AnimatePresence initial={false}>
              {demoProtocols.map((protocol) => {
                return (
                  <DemoCard
                    protocol={protocol}
                    callbackAdd={() => handleAdd(protocol)}
                    callbackRemove={() => handleRemove(protocol)}
                    key={protocol.id}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <h2>My Protocols</h2>
          <div className={styles.demoGrid + " box"}>
            <AnimatePresence initial={false}>
              {activeProtocols.map((protocol) => {
                return (
                  <DemoActiveCard
                    protocol={protocol}
                    callbackRemove={() => handleRemove(protocol)}
                    callbackAdd={() => handleAdd(protocol)}
                    key={protocol.id}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export const DemoCard = ({ protocol, callbackAdd, callbackRemove }) => {
  const { id, title, categories, benefits } = protocol;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "tween", duration: 0.2 }}
      className={styles.protocolCard + " box"}
    >
      <div className={styles.protocol}>
        <div className={styles.protocolHeading}>
          <span className={styles.categories}>{categories}</span>
          <FakeButton
            isAdded={false}
            callbackAdd={callbackAdd}
            callbackRemove={callbackRemove}
          />
        </div>
        <div className={styles.protocolMain}>
          <h2>{title}</h2>
          <span className={styles.benefits}>{benefits}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const DemoActiveCard = ({ protocol, callbackRemove, callbackAdd }) => {
  const { id, title, categories, benefits } = protocol;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ type: "tween", duration: 0.2 }}
      className={styles.protocolCard + " box"}
    >
      <div className={styles.protocol}>
        <div className={styles.protocolHeading}>
          <span className={styles.categories}>{categories}</span>
          <FakeButton
            isAdded={true}
            callbackAdd={callbackAdd}
            callbackRemove={callbackRemove}
          />
        </div>
        <div className={styles.protocolMain}>
          <h2>{title}</h2>
          <span className={styles.benefits}>{benefits}</span>
        </div>
      </div>
    </motion.div>
  );
};
