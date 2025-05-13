/*
  Fixed Dock component that stays at the bottom of the viewport - Optimized performance
*/

"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  useEffect,
  useRef,
  useState,
  memo,
} from "react";
import { createPortal } from "react-dom";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

// Individual dock item component - memoized for performance
const DockItem = memo(({ 
  item, 
  mouseX, 
  baseItemSize, 
  magnification, 
  distance, 
  springConfig 
}: { 
  item: DockItemData;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  baseItemSize: number;
  magnification: number;
  distance: number;
  springConfig: SpringOptions;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate size based on mouse position - computed only when needed
  const mouseDistance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return val - rect.x - rect.width / 2;
  });
  
  // More performance-friendly transform
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  
  // Apply spring settings with optimized parameters
  const size = useSpring(targetSize, {
    ...springConfig,
    restDelta: 0.1, // Stop animation earlier when close to target
    restSpeed: 0.1, // Stop animation earlier when movement slows
  });
  
  return (
    <div className="dock-item-wrapper" style={{ 
      width: baseItemSize, 
      height: baseItemSize,
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <motion.div
        ref={ref}
        style={{
          width: size,
          height: size,
          backgroundColor: "rgba(50, 50, 50, 0.7)",
          borderRadius: "12.6px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={(e) => {
          // Prevent propagation rather than default to avoid any conflicts
          e.stopPropagation();
          item.onClick();
        }}
        tabIndex={0}
        role="button"
      >
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          transform: "scale(1.1)"  // Slightly smaller scale for better fit
        }}>
          {item.icon}
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: -80 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              style={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(40, 40, 40, 0.85)",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "14.7px",
                fontSize: "18px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 7px 14px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(5px)",
                zIndex: 10000,
              }}
              role="tooltip"
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
});

DockItem.displayName = 'DockItem';

// Simple placeholder with no animations
function DockPlaceholder({ height = 120 }: { height?: number }) {
  return (
    <div style={{ height: `${height}px`, width: '100%' }} />
  );
}

// The main Dock component - optimized rendering
const Dock = ({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 56,
  distance = 180,
  panelHeight = 75,
  baseItemSize = 56,
}: DockProps) => {
  const mouseX = useMotionValue(Infinity);
  const [mounted, setMounted] = useState(false);

  // Use layout effect for faster DOM updates
  useEffect(() => {
    // Set body padding immediately to prevent content jump
    document.body.style.paddingBottom = "210px";
    
    // Set mounted state immediately to avoid unnecessary delay
    setMounted(true);
    
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, []);

  // Return placeholder if not mounted
  if (!mounted) {
    return <DockPlaceholder height={210} />;
  }
  
  // Static dock element - less animations for better performance
  const dockElement = (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "210px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        padding: "0 0 35px 0",
        pointerEvents: "none",
        zIndex: 100000,
      }}
    >
      <div
        style={{
          pointerEvents: "auto",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          width: "auto",
        }}
      >
        <motion.div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={`dock-panel ${className || ""}`}
          style={{
            height: panelHeight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            padding: "8px 16px",
            borderRadius: "18.9px",
            backgroundColor: "rgba(30, 30, 30, 0.75)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
            position: "relative",
          }}
          role="toolbar"
          aria-label="Application dock"
        >
          {items.map((item, index) => (
            <DockItem
              key={index}
              item={item}
              mouseX={mouseX}
              baseItemSize={baseItemSize}
              magnification={magnification}
              distance={distance}
              springConfig={spring}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
  
  return createPortal(dockElement, document.body);
}

export default memo(Dock); 