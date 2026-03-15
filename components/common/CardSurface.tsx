"use client";

import React from "react";

interface CardSurfaceProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const CardSurface: React.FC<CardSurfaceProps> = ({ children, className = "", style }) => {
  return (
    <div
      className={`rounded-[14px] border border-[#1E2B27] bg-[#111C18] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.35)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_10px_25px_rgba(0,0,0,0.45)] ${className}`}

      style={style}
    >
      {children}
    </div>
  );
};

export default CardSurface;
