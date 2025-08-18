import React from 'react';
import { StyledInput, InputWrapper, Label, ErrorMessage } from './style';

const Input = ({
  label,
  error,
  size = 'medium',
  disabled = false,
  className = '',
  register,        // <-- comes from react-hook-form
  name,            // <-- required for register
  rules = {},      // <-- validation rules
  ...props
}) => {
  const inputProps = register && name 
    ? { ...register(name, rules) } // if register is provided
    : {}; // fallback to normal input

  return (
    <InputWrapper className={className}>
      {label && <Label>{label}</Label>}
      <StyledInput
        size={size}
        error={error}
        disabled={disabled}
        {...props}
        {...inputProps}  // dynamically apply register or not
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};

export default Input;