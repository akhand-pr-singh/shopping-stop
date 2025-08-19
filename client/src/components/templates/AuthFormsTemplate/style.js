import styled from "styled-components";

export const AuthFormContainer = styled.div`
  .sign-in-button {
    width: 100%;
    margin-top:10px;
  }

  .sign-up-button {
  width:100%;
  margin-top:10px;
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

  .form-footer {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 10px;

    button{
    margin-left:0px;
    }

    p {
      margin: 0;
    }
  }
`;
