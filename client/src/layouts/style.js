import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f5f7fa;

  .auth {
    &_left-panel {
      display: ${(props) => (props?.$dimension.width < 991 ? "none" : "flex")};
      flex: 1;
      background: linear-gradient(135deg, #007bff 0%, #0056d2 100%);
      color: white;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem;

      &_logo {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        text-decoration: none;
        color: #333;

        .logo-text {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          margin: 0;
        }
      }
      &_title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        font-weight: 600;
      }
      &_subtitle {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        font-weight: normal;
      }
      &_description {
        font-size: 0.9rem;
        max-width: 400px;
        text-align: center;
        line-height: 1.5;
      }
    }

    &_right-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #ffffff;
      justify-content: center;
      align-items: center;
      &_logo {
        display: ${(props) => (props?.$dimension.width < 991 ? "flex" : "none")};
        align-items: center;
        gap: 8px;
        cursor: pointer;
        text-decoration: none;
        color: #333;
        margin-bottom: 10px;
        .logo-text {
          font-size: 2rem;
          font-weight: 500;
          margin: 0;
        }
      }
      &_form-wrapper {
        width: 100%;
        max-width: 400px;
        padding: 2rem;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        background: #fff;
      }
    }
  }
`;
