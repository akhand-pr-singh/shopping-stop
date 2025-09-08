import React, { useCallback } from "react";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "../context/ResponsiveContext";

const AuthLayout = ({ children }) => {
  const navigate = useNavigate();
  const handleLogoClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const dimension = useResponsive();

  return (
    <Container $dimension={dimension}>
      {/* Left Section */}
      <div className="auth_left-panel">
        <div className="auth_left-panel_logo" onClick={handleLogoClick}>
          <h1 className="logo-text">🛍️ ShoppingStop</h1>
        </div>
        <h4 className="auth_left-panel_title">WELCOME BACK</h4>
        <h5 className="auth_left-panel_subtitle">Nice to see you again</h5>
        <p className="auth_left-panel_description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Right Section */}
      <div className="auth_right-panel">
        <div className="auth_right-panel_logo" onClick={handleLogoClick}>
          <h1 className="logo-text">🛍️ ShoppingStop</h1>
        </div>
        <div className="auth_right-panel_form-wrapper">
          {children} {/* SignInForm / SignUpForm / ResetPasswordForm */}
        </div>
      </div>
    </Container>
  );
};

export default AuthLayout;