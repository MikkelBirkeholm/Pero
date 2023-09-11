import * as Tooltip from "@radix-ui/react-tooltip";
import styles from "./IconTooltip.module.scss";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

import React from "react";

export const IconTooltip = ({ text }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <QuestionMarkCircledIcon />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={styles.content}>
            <Tooltip.Arrow />
            <p>{text}</p>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
