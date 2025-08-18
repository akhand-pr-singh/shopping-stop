import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { SignInFormContainer } from "./style";

const SignInForm = ({ onForgotPassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Sign In Data:", data);
    // Call your sign-in API here
  };

  return (
    <SignInFormContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
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
        className="form-inputs"
      />

      {/* Password */}
      <Input
        label="Password"
        name="password"
        type="password"
        register={register}
        rules={{ required: "Password is required" }}
        error={errors.password?.message}
        placeholder="Enter your password"
        className="form-inputs"
      />
      {/* Forgot Password */}
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onForgotPassword}
          className="forgot-password-button"
        >
          Forgot Password?
        </Button>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isSubmitting}
        className="sign-in-button"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
    </SignInFormContainer>
  );
};

export default SignInForm;
