import React from 'react';

export default function Textarea({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="label">{label}</span>}
      <textarea className={`input ${className}`} {...props} />
    </label>
  );
}

