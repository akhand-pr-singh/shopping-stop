import React, { useCallback } from "react";
import { 
  Container, 
  LeftPanel, 
  RightPanel, 
  Title, 
  Subtitle, 
  Description, 
  FormWrapper, 
  Logo,
  LogoText
} from "./style";
import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    const handleLogoClick = useCallback(() => {
        navigate('/');
      }, [navigate]);
  return (
    <Container>
      {/* Left Section */}
      <LeftPanel>
      <Logo onClick={handleLogoClick}>
          <LogoText>🛍️ ShoppingStop</LogoText>
        </Logo>
        <Title>WELCOME BACK</Title>
        <Subtitle>Nice to see you again</Subtitle>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Description>
      </LeftPanel>

      {/* Right Section */}
      <RightPanel>
        <FormWrapper>
          {children} {/* SignInForm / SignUpForm / ResetPasswordForm */}
        </FormWrapper>
      </RightPanel>
    </Container>
  );
};

export default AuthLayout;