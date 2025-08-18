import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";

const ResetPasswordForm = ({ token }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Reset Password Data:", { ...data, token });
    // Call API: reset password using token + new password
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="New Password"
        name="password"
        type="password"
        register={register}
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
        }}
        error={errors.password?.message}
        placeholder="Enter new password"
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        register={register}
        rules={{
          required: "Confirm password is required",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
        error={errors.confirmPassword?.message}
        placeholder="Confirm new password"
      />

      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
