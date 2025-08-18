import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";

const ForgotPasswordForm = ({ onResetLinkSent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forgot Password Email:", data.email);
    // Call API: send reset password email
    onResetLinkSent && onResetLinkSent(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        placeholder="Enter your registered email"
      />

      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
};

export default ForgotPasswordForm;
