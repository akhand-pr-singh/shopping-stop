import React, { useState } from "react";
import { ForgotPasswordForm, ResetPasswordForm, SignInForm, SignUpForm } from "../../components/templates/AuthFormsTemplate";
import { AuthLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";

const AuthPage = ({initialView="signin"}) => {
  const [view, setView] = useState(initialView); // signin | forgot | reset
  const navigate = useNavigate();

  const onNewUser = () => {
    navigate('/sign-up');
    setView("signup");
  };

  const onExistingUser = () => {
    navigate('/login');
    setView("signin");
  };

  return (
    <AuthLayout>
      {view === "signin" && (
        <SignInForm onForgotPassword={() => setView("forgot")} onNewUser={onNewUser} />
      )}

      {view === "forgot" && (
        <ForgotPasswordForm onResetLinkSent={() => setView("reset")} />
      )}

      {view === "reset" && (
        <ResetPasswordForm token="123456" />
      )}
       {view === "signup" && (
        <SignUpForm onExistingUser={onExistingUser} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
