import React, { useState } from "react";
import { ForgotPasswordForm, ResetPasswordForm, SignInForm, SignUpForm } from "../../components/templates/AuthFormsTemplate";
import { AuthLayout } from "../../layouts";

const AuthPage = ({initialView="signin"}) => {
  const [view, setView] = useState(initialView); // signin | forgot | reset

  return (
    <AuthLayout>
      {view === "signin" && (
        <SignInForm onForgotPassword={() => setView("forgot")} />
      )}

      {view === "forgot" && (
        <ForgotPasswordForm onResetLinkSent={() => setView("reset")} />
      )}

      {view === "reset" && (
        <ResetPasswordForm token="123456" />
      )}
       {view === "signup" && (
        <SignUpForm />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
