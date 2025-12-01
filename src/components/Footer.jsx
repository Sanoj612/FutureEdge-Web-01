import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-white/40 bg-white/20 backdrop-blur-xl">
      <div className="container-narrow py-6 text-sm text-gray-700 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-primary-700">FutureEdge</span> © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-4">
          <a className="hover:underline" href="#">Privacy</a>
          <a className="hover:underline" href="#">Terms</a>
          <a className="hover:underline" href="#">Support</a>
        </div>
      </div>
    </footer>
  );
}
