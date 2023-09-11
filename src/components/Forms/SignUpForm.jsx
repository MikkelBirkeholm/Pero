import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./Forms.module.scss";
import { IconTooltip } from "../Singles/IconTooltip/IconTooltip";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const fieldData = watch();
  const onSubmit = () => console.log(fieldData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formWrapper}>
      <label>
        <span>First Name</span>
        <input
          placeholder="First Name"
          type="text"
          {...register("firstname", {
            required: "This field is required",
            pattern: {
              value: /^(?!\s+$)[a-zA-ZÆØÅæøå,'. -]+$/,
              message: "You can only include letters",
            },
          })}
        />
        {errors.firstname && (
          <p className={styles.errorMessage}>{errors.firstname.message}</p>
        )}
      </label>
      <label>
        <span>
          Last Name
          <IconTooltip text="We use this to improve the platform overall" />
        </span>
        <input
          placeholder="Last Name"
          type="text"
          {...register("lastname", {
            required: "This field is required",
            pattern: {
              value: /^(?!\s+$)[a-zA-ZÆØÅæøå,'. -]+$/,
              message: "You can only include letters",
            },
          })}
        />
        {errors.lastname && (
          <p className={styles.errorMessage}>{errors.lastname.message}</p>
        )}
      </label>
      <label>
        <span>Email</span>
        <input
          placeholder="Email"
          type="email"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Please enter a valid email format",
            },
          })}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </label>
      <input type="submit" value="sign up" />
    </form>
  );
}
