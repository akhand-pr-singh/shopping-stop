import styled, { css } from 'styled-components';

export const StyledButton = styled.button`
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: inherit;
  font-size: ${props => {
    switch (props.size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  padding: ${props => {
    switch (props.size) {
      case 'small': return '8px 16px';
      case 'large': return '16px 32px';
      default: return '12px 24px';
    }
  }};

  ${props => props.disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}

  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          background-color: #6c757d;
          color: white;
          &:hover:not(:disabled) {
            background-color: #545b62;
            transform: translateY(-1px);
          }
        `;
      case 'success':
        return css`
          background-color: #28a745;
          color: white;
          &:hover:not(:disabled) {
            background-color: #1e7e34;
            transform: translateY(-1px);
          }
        `;
      case 'danger':
        return css`
          background-color: #dc3545;
          color: white;
          &:hover:not(:disabled) {
            background-color: #c82333;
            transform: translateY(-1px);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 2px solid #007bff;
          color: #007bff;
          &:hover:not(:disabled) {
            background-color: #007bff;
            color: white;
          }
        `;
      default: // primary
        return css`
          background-color: #007bff;
          color: white;
          &:hover:not(:disabled) {
            background-color: #0056b3;
            transform: translateY(-1px);
          }
        `;
    }
  }}
`;
