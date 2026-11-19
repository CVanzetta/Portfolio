import React from 'react';

export default function HobbyIcon({ kind }) {
  return <svg className="hobby-icon" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {kind === 'shuttle' ? <g transform="rotate(24 32 32)" stroke="#534579" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path fill="#d9cdef" d="M23 40 12 18c-2-4 1-8 5-7 4 1 7 5 10 9l7 20Z"/>
      <path fill="#d9cdef" d="m41 40 11-22c2-4-1-8-5-7-4 1-7 5-10 9l-7 20Z"/>
      <path fill="#fdf9f2" d="M27 41 24 15c-.4-5 3-9 8-9s8.4 4 8 9l-3 26Z"/>
      <path d="M32 14v25M17 19l10 20m20-20L37 39" stroke="#8a76ad"/>
      <path fill="#ffdaa0" d="M25 46h14v5a7 7 0 0 1-14 0Z"/>
      <path fill="#8370b2" d="M24 40h16l-1 7H25Z"/>
    </g> : <g stroke="#534579" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 7v16m-5-6h10m-8-5h6"/>
      <path fill="#eab1c5" d="m27 22 3-4h4l3 4 4 5H23Z"/>
      <path fill="#fdf9f2" d="M22 27h20l-3 8H25Z"/>
      <path d="M26 31h12" stroke="#9c84bf"/>
      <path fill="#c9b8e7" d="M29 35h6l3 19H26Z"/>
      <path fill="#d5c6ed" d="M8 54c7 0 9-7 15-7 5 0 7 4 11 4 4 0 7-6 12-6 4 0 6 5 10 6v5H8Z"/>
      <path d="M14 56h36"/>
    </g>}
  </svg>;
}
