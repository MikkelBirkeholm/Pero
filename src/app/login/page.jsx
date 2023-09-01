import styles from "./styles.module.scss";

export const dynamic = "force-dynamic";

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <h1>Sign In</h1>
      <form action="/auth/login" method="post">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <button>Sign In</button>
      </form>
    </div>
  );
}
