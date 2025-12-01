import React from 'react';

export default function Card({ className = '', children, header, actions }) {
  return (
    <div className={`card ${className}`}>
      {(header || actions) && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 className="text-base font-semibold">{header}</h3>
          <div className="flex items-center gap-2">{actions}</div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

