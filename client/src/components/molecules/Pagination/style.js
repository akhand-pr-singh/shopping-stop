import styled from "styled-components";

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
`;

export const PaginationButton = styled.button`
  padding: 8px 12px;
  border: 2px solid #e1e5e9;
  background: white;
  color: #333;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    border-color: #007bff;
    color: #007bff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.active {
    background: #007bff;
    border-color: #007bff;
    color: white;
  }
`;

export const PaginationInfo = styled.span`
  font-size: 14px;
  color: #6c757d;
  margin: 0 16px;
`;