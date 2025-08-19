import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { authService } from "../../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthFormContainer } from "./style";


const SignUp = ({onExistingUser}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    try {
      await authService.register(data);
      toast.success('User created successfully!');
      navigate('/products');
    } catch (error) {
      console.log('Error while signing up', error);
      toast.error(error.message||'Sign up unsuccessful!');
    }
  };

  return (
    <AuthFormContainer>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <Input
        label="Name"
        name="name"
        register={register}
        rules={{ required: "Name is required" }}
        error={errors.name?.message}
        placeholder="Enter your name"
        className="form-inputs"
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
        className="form-inputs"
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
        className="form-inputs"
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
        className="form-inputs"
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="medium"
        disabled={isSubmitting}
        className="sign-up-button"
      >
        {isSubmitting ? "Signing up..." : "Sign Up"}
      </Button>
      <div className="form-footer">
        <p>Already have an account?</p>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onExistingUser}
          className="forgot-password-button"
        >
          Login
        </Button>
      </div>
    </form>
    </AuthFormContainer>
  );
};

export default SignUp;