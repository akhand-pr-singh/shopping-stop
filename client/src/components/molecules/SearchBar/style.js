import styled from 'styled-components';

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 48px 12px 16px;
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
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }

  &:focus {
    outline: none;
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

export const SearchIcon = styled.span`
  font-size: 18px;
  line-height: 1;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 48px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  display: ${props => props.show ? 'block' : 'none'};

  &:hover {
    background-color: #f8f9fa;
    color: #dc3545;
  }

  &:focus {
    outline: none;
    background-color: #f8f9fa;
    color: #dc3545;
  }
`;

export const ClearIcon = styled.span`
  font-size: 16px;
  line-height: 1;
`;
