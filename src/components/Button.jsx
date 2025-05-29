// src/components/Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', ariaLabel }) => (
  <button
    type={type}
    onClick={onClick}
    className={`font-semibold rounded-md py-3 transition ${className}`}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
