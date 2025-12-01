import React from 'react';

export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="label">{label}</span>}
      <input className={`input ${className}`} {...props} />
    </label>
  );
}

