import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { axiosinsta } from "../config/axiosinsta.jsx";

export let useAuth = () => {
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const onLogin = async (data) => {
    setApiError("");
    try {
      console.log("Submitting login payload:", data);
      const res = await axiosinsta.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      console.log("Login Success Response:", res.data);
      navigate("/home");
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.msg || "Login failed. Please check credentials.";
      setApiError(msg);
    }
  };

  const onRegister = async (data) => {
    setApiError("");
    try {
      console.log("Submitting register payload:", data);
      const res = await axiosinsta.post("/api/auth/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
      console.log("Register Success Response:", res.data);
      navigate("/home");
    } catch (err) {
      console.error("Register Error:", err);
      const msg = err.response?.data?.msg || "Registration failed. Please try again.";
      setApiError(msg);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    apiError,
    onLogin,
    onRegister,
  };
};