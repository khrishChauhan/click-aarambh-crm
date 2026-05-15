"use client";

import React, { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableHover3D?: boolean;
}

// Shared card styling
const cardBaseStyle: React.CSSProperties = {
  background: "#111C18",
  border: "1px solid #1E2B27",
};

/**
 * Static card — zero framer-motion overhead.
 * Used when disableHover3D={true} (charts, tables, etc.)
 */
const StaticCard: React.FC<Omit<InteractiveCardProps, "disableHover3D">> = ({
  children,
  className = "",
  style,
}) => (
  <div style={{ height: "100%" }}>
    <div
      className={`rounded-[14px] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.35)] ${className}`}
      style={{ ...cardBaseStyle, ...style }}
    >
      {children}
    </div>
  </div>
);

/**
 * Animated card with 3D tilt on hover.
 * Uses matchMedia instead of per-card resize listeners.
 */
const AnimatedCard: React.FC<Omit<InteractiveCardProps, "disableHover3D">> = ({
  children,
  className = "",
  style,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Check mobile once via matchMedia (no ongoing resize listener)
  const isMobile = typeof window !== "undefined"
    ? window.matchMedia("(max-width: 767px)").matches
    : false;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  }, [isMobile, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (isMobile) {
    // On mobile, render static — no motion overhead
    return (
      <StaticCard className={className} style={style}>
        {children}
      </StaticCard>
    );
  }

  return (
    <div style={{ perspective: "1000px", height: "100%" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          ...cardBaseStyle,
        }}
        whileHover={{
          y: -4,
          boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
        }}
        whileTap={{ scale: 0.98 }}
        transition={{
          duration: 0.2,
          ease: "easeOut"
        }}
        className={`rounded-[14px] p-6 shadow-[0_6px_18px_rgba(0,0,0,0.35)] ${className}`}
      >
        <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * InteractiveCard — renders either a static div or an animated 3D card.
 * When disableHover3D is true, ZERO motion values/springs/transforms are created.
 */
const InteractiveCard: React.FC<InteractiveCardProps> = ({
  disableHover3D = false,
  ...props
}) => {
  if (disableHover3D) {
    return <StaticCard {...props} />;
  }
  return <AnimatedCard {...props} />;
};

export default InteractiveCard;
