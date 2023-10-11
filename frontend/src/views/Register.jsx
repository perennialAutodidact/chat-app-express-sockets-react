import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formValues = getValues();
    reset();
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "post",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!res || !res.ok || res.status >= 400) return;

      const data = await res.json();
      if (!data) return;
      console.log(data);
    } catch (error) {
      return;
    }
  };

  const style = {
    container: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      marginTop: "5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      label: {
        display: "flex",
        flexDirection: "column",
      },
      input: {
        border: "1px solid black",
        borderRadius: "5px",
        padding: "5px",
      },
    },
  };

  return (
    <div style={style.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={style.form}>
        <label htmlFor="username" style={style.form.label}>
          <span>Username</span>
          <input {...register("username")} style={style.form.input} />
        </label>
        <label htmlFor="password" style={style.form.label}>
          <span>Password</span>
          <input {...register("password")} style={style.form.input} />
        </label>

        <button type="submit">Register</button>
        <a onClick={() => navigate("/login")}>Log in</a>
      </form>
    </div>
  );
};

export default Register;
