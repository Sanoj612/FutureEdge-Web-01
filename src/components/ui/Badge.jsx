import React from 'react';

export default function Badge({ children, variant = 'default', className = '' }) {
  const base = variant === 'primary' ? 'badge badge-primary' : 'badge';
  return <span className={`${base} ${className}`}>{children}</span>;
}

