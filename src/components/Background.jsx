import React from 'react';

export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-animated w-full h-full" />
      <div className="blob left-[-10%] top-[10%] w-[28rem] h-[28rem]" style={{ background: 'radial-gradient(closest-side, #6366f1, transparent)' }} />
      <div className="blob right-[-10%] top-[40%] w-[28rem] h-[28rem] motion-safe:animate-float-slow" style={{ background: 'radial-gradient(closest-side, #3b82f6, transparent)' }} />
      <div className="blob left-[30%] bottom-[-10%] w-[28rem] h-[28rem]" style={{ background: 'radial-gradient(closest-side, #0ea5e9, transparent)' }} />
    </div>
  );
}
