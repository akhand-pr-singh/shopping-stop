import styled from "styled-components";

export const SignInFormContainer = styled.div`
  .sign-in-button {
    width: 100%;
  }

  .forgot-password-button {
    background: transparent;
    color: #007bff;
    width: fit-content;
    margin: 10px 0;
    padding: 0;
    display: flex;
    margin-left: auto;
    &:hover {
      color: #0044ff;
      background: transparent;
    }
  }

  .form-inputs {
  margin-top:10px;
  }
`;
