import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";


const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Sign Up Data:", data);
    // you can call your API here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <Input
        label="Name"
        name="name"
        register={register}
        rules={{ required: "Name is required" }}
        error={errors.name?.message}
        placeholder="Enter your name"
      />

      {/* Email */}
      <Input
        label="Email"
        name="email"
        register={register}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email",
          },
        }}
        error={errors.email?.message}
        placeholder="Enter your email"
      />

      {/* Password */}
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 chars" },
        }}
        error={errors.password?.message}
        placeholder="Enter your password"
      />

      {/* Confirm Password */}
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        rules={{
          required: "Please confirm your password",
          validate: (value, formValues) =>
            value === formValues.password || "Passwords do not match",
        }}
        error={errors.confirmPassword?.message}
        placeholder="Confirm your password"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUp;