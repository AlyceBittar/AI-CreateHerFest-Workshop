import { ReactNode } from 'react';

interface ColumnProps {
  children: ReactNode;
  verticalPadding?: number;
  horizontalPadding?: number;
  title: string;
}

export default function Column({ children, title }: ColumnProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 h-full px-4">
      <h1 className="text-2xl mb-6 text-white text-center">{title}</h1>
      <div className="flex flex-col flex-1 min-h-0 gap-24 overflow-auto justify-center">
        {children}
      </div>
    </div>
  );
}
