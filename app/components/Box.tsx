'use client';

import { ReactNode } from 'react';

interface BoxProps {
  children: ReactNode;
  title: string;
  isActive?: boolean;
}

export default function Box({ children, title, isActive = false }: BoxProps) {
  return (
    <div
      className={`w-full rounded-lg p-4 border-2 bg-gray-800 ${
        isActive
          ? 'border-green-500 shadow-xl shadow-green-500/20'
          : 'border-gray-200/20'
      }`}
    >
      <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
      {children}
    </div>
  );
}
