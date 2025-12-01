import React from 'react';

export default function Button({ variant = 'primary', className = '', ...props }) {
  const base = 'btn ' + (variant === 'secondary' ? 'btn-secondary' : 'btn-primary');
  return <button className={`${base} ${className}`} {...props} />;
}

