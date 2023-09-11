import * as Tabs from "@radix-ui/react-tabs";
import React from "react";
import styles from "./Login.module.scss";
import SignUpForm from "../Forms/SignUpForm";

export const LoginTabs = () => {
  return (
    <Tabs.Root className={styles.tabsWrapper} defaultValue="signup">
      <Tabs.List className={styles.tabsList} aria-label="Login or sign up">
        <Tabs.Trigger value="login">Login</Tabs.Trigger>
        <Tabs.Trigger value="signup">Sign Up</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content className={styles.tabsContent} value="login">
        Login Form
      </Tabs.Content>
      <Tabs.Content value="signup" className={styles.tabsContent}>
        <SignUpForm />
      </Tabs.Content>
    </Tabs.Root>
  );
};
