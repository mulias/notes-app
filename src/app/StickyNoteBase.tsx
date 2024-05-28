"use client";

import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  colorSeed: number;
  className?: string;
  onClick?: () => void;
}

const StickyNoteBase = ({
  children,
  colorSeed,
  className,
  ...props
}: Props) => (
  <div
    className={`w-[300px] h-[300px] ${bgColor(colorSeed)} ${className}`}
    {...props}
  >
    {children}
  </div>
);

const bgColor = (seed: number): string => {
  const colors = [
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-orange-400",
  ];
  const count = colors.length;
  return colors[seed % count];
};

export default StickyNoteBase;
