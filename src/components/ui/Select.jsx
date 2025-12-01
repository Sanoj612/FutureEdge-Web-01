import React from 'react';

export default function Select({ label, className = '', children, ...props }) {
  return (
    <label className="block">
      {label && <span className="label">{label}</span>}
      <select className={`input ${className}`} {...props}>
        {children}
      </select>
    </label>
  );
}

