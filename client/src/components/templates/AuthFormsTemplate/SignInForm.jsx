import { useForm } from "react-hook-form";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { AuthFormContainer } from "./style";
import { authService } from "../../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ onForgotPassword, onNewUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    try {
      const {email, password} = data;
      await authService.login(email, password);
      toast.success('Logged in successfully!');
      navigate('/products');
    } catch (error) {
      console.log('Error while logging in', error);
      toast.error(error.message||'Login unsuccessful!');
    }
  };

  return (
    <AuthFormContainer>
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
        {/* <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onForgotPassword}
          className="forgot-password-button"
        >
          Forgot Password?
        </Button> */}

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

        <div className="form-footer">
        <p>Don't have an account?</p>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={onNewUser}
          className="forgot-password-button"
        >
          Sign Up
        </Button>
      </div>
    </form>
    </AuthFormContainer>
  );
};

export default SignInForm;
