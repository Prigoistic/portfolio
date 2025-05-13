/*
	Optimized version with improved performance
*/

import React, { useEffect, useMemo, useRef, ReactNode, RefObject, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./ScrollFloat.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

// Memoize for better performance
const ScrollFloat: React.FC<ScrollFloatProps> = memo(({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Memoize the split text to avoid recalculation on re-renders
  const splitText = useMemo(() => {
    if (typeof children !== "string") return children;
    
    // For the intro text, always use character splitting for best animation results
    // Split by characters for the detailed animation
    return children.split("").map((char, index) => (
      <span className="char" key={index}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Get all character elements
    const charElements = el.querySelectorAll(".char");
    
    // Make sure we always have elements to animate
    if (charElements.length === 0) return;

    // Use the full animation for better visual effect
    const animation = gsap.fromTo(
      charElements,
      {
        willChange: "opacity, transform",
        opacity: 0,
        yPercent: 100,
        scaleY: 1.5,
        scaleX: 0.9,
        transformOrigin: "50% 0%"
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: false,
          toggleActions: "play none none reset",
          markers: false,
          fastScrollEnd: true,
          preventOverlaps: true,
          onEnter: () => {
            // Force better rendering
            gsap.set(el, {force3D: true});
          }
        },
      }
    );

    return () => {
      // Clean up animation to prevent memory leaks
      if (animation) animation.kill();
      
      // Clean up scroll triggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
    children // Depend on children to restart animation when content changes
  ]);

  return (
    <h2 ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </h2>
  );
});

ScrollFloat.displayName = 'ScrollFloat';

export default ScrollFloat;
