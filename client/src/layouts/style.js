import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f5f7fa;
`;

export const LeftPanel = styled.div`
  flex: 1;
  background: linear-gradient(
    135deg,
    #007bff 0%,
    #0056d2 100%
  );
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-decoration: none;
  color: #333;
`;

export const LogoText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const RightPanel = styled.div`
  flex: 1;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const Subtitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: normal;
`;

export const Description = styled.p`
  font-size: 0.9rem;
  max-width: 400px;
  text-align: center;
  line-height: 1.5;
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.1);
  border-radius: 12px;
  background: #fff;
`;
