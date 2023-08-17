"use client";
import * as Avatar from "@radix-ui/react-avatar";
import styles from "./styles.module.scss";

export default ({ src, width, alt, fallback }) => (
  <Avatar.Root className={styles.userAvatar}>
    <Avatar.Image src={src} width={width} alt={alt} />
    <Avatar.Fallback className={styles.fallback} delayMs={400}>
      {fallback}
    </Avatar.Fallback>
  </Avatar.Root>
);
