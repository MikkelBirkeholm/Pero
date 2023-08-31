"use client";
import * as Avatar from "@radix-ui/react-avatar";
import styles from "./styles.module.scss";

const userAvatar = ({ src, width, alt, fallback }) => {
  return (
    <Avatar.Root className={styles.userAvatar}>
      <Avatar.Image src={src} width={width} alt={alt} />
      <Avatar.Fallback className={styles.fallback} delayMs={400}>
        {fallback}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default userAvatar;
