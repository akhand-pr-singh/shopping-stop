import styled, { css } from 'styled-components';

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: all 0.2s ease-in-out;
  background-color: white;
  color: #333;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #6c757d;
  }

  ${props => props.error && css`
    border-color: #dc3545;
    &:focus {
      border-color: #dc3545;
      box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
    }
  `}

  ${props => props.disabled && css`
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  `}

  ${props => {
    switch (props.size) {
      case 'small':
        return css`
          padding: 8px 12px;
          font-size: 14px;
        `;
      case 'large':
        return css`
          padding: 16px 20px;
          font-size: 18px;
        `;
      default:
        return css`
          padding: 12px 16px;
          font-size: 16px;
        `;
    }
  }}
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  font-weight: 500;
`;
