"use client";

import React, { useState, useEffect, useRef } from "react";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";


interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableHover3D?: boolean;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  children, 
  className = "", 
  style,
  disableHover3D = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for X and Y cursor position relative to card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Transforms for rotateX, rotateY based on mouse position (-0.5 to 0.5)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile || disableHover3D) return;

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
    <div style={{ perspective: "1000px", height: "100%" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          rotateX: (isMobile || disableHover3D) ? 0 : rotateX,
          rotateY: (isMobile || disableHover3D) ? 0 : rotateY,
          transformStyle: "preserve-3d",
          background: "#111C18",
          border: "1px solid #1E2B27",
        }}
        whileHover={(!isMobile && !disableHover3D) ? {
          y: -4,
          boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
        } : {}}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className={`rounded-[14px] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.35)] ${className}`}
      >
        <div style={{ transform: (isMobile || disableHover3D) ? "none" : "translateZ(30px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};




export default InteractiveCard;
