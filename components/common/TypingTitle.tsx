"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";

interface TypingTitleProps {
  text: string;
  className?: string;
}

const TypingTitle: React.FC<TypingTitleProps> = ({ text, className = "" }) => {
  return (
    <div className={`typing-title-container mb-6 ${className}`}>
      <style jsx global>{`
        .custom-type-cursor::after {
          content: '█';
          color: #82C21C;
          display: inline-block;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          font-size: 0.9em;
          vertical-align: baseline;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
      <TypeAnimation
        sequence={[
          text,
          () => {
            // Animation finished
          },
        ]}
        wrapper="span"
        cursor={false}
        className="custom-type-cursor"
        style={{
          fontSize: 'clamp(24px, 5vw, 32px)',
          fontWeight: 600,
          color: '#E6F0ED',
          display: 'inline-block',
          letterSpacing: '-0.5px',
          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        }}
      />
    </div>
  );
};

export default TypingTitle;
