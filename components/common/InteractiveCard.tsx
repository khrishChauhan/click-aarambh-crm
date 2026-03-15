"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ children, className = "", style }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for X and Y cursor position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation and translation
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  // Transforms for rotateX, rotateY based on mouse position
  // 3D Tilt: rotateX follows Y motion, rotateY follows X motion
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-4deg", "4deg"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate relative mouse position from -0.5 to 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-container" 
      style={{ perspective: "1000px", height: "100%" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(17, 28, 24, 0.6)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
        whileHover={!isMobile ? {
          y: -6,
          scale: 1.02,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(130, 194, 28, 0.15)",
        } : {}}
        whileTap={{ 
          y: -4, 
          scale: 0.98,
          boxShadow: isMobile ? "0 10px 20px rgba(0, 0, 0, 0.4), 0 0 15px rgba(130, 194, 28, 0.1)" : ""
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        className={`rounded-2xl p-6 transition-colors shadow-2xl ${className}`}

      >
        <div style={{ transform: "translateZ(20px)" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};


export default InteractiveCard;
