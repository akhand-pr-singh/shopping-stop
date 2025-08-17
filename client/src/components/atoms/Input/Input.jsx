import React from 'react';
import { StyledInput, InputWrapper, Label, ErrorMessage } from './style';

const Input = ({
  label,
  error,
  size = 'medium',
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <InputWrapper className={className}>
      {label && <Label>{label}</Label>}
      <StyledInput
        size={size}
        error={error}
        disabled={disabled}
        {...props}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;
