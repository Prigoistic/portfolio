"use client";

import { useEffect, useState, createRef, memo } from "react";
import TransitionLink from "../components/TransitionLink";

// Memoized icon components for better performance
const HomeIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
));

const AboutIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
));

const ContactIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
));

const WorkIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.65 14.65L11.5 12.29 9 15.25l-2.85-3.42L3 15.68V5c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12.8l-3.65-1.15z" />
  </svg>
));

const BuilderIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
));

// Add display names
HomeIcon.displayName = 'HomeIcon';
AboutIcon.displayName = 'AboutIcon';
ContactIcon.displayName = 'ContactIcon';
WorkIcon.displayName = 'WorkIcon';
BuilderIcon.displayName = 'BuilderIcon';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [contentVisible, setContentVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fullText = "Priyam Ghosh";
  const typingSpeed = 150; // milliseconds
  
  // Create refs for all grid cards for animations
  const refs = Array(6).fill(0).map(() => createRef<HTMLDivElement>());

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Give a small delay after typing completes before transitioning
        setTimeout(() => {
          setShowIntro(false);
          
          // Small delay before showing content to ensure a smooth transition
          setTimeout(() => {
            setContentVisible(true);
          }, 100);
        }, 800);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, []);

  // Mouse move effect for grid cards
  useEffect(() => {
    if (!showIntro) {
      const handleMouseMove = (e: MouseEvent, card: HTMLDivElement) => {
        // Skip effect on mobile devices
        if (isMobile) return;
        
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
      };

      const listeners: { element: HTMLDivElement, listener: (e: MouseEvent) => void }[] = [];

      refs.forEach(ref => {
        const card = ref.current;
        if (card) {
          const listener = (e: MouseEvent) => handleMouseMove(e, card);
          card.addEventListener('mousemove', listener);
          listeners.push({ element: card, listener });
        }
      });

      return () => {
        listeners.forEach(({ element, listener }) => {
          element.removeEventListener('mousemove', listener);
        });
      };
    }
  }, [showIntro, refs, isMobile]);

  return (
    <>
      {showIntro && (
        <div className="name-intro">
          <div className="name-container">
            <h1>{displayedText}</h1>
            <div className="animated-cursor"></div>
          </div>
        </div>
      )}

      <main className={`exact-layout main-content-transition ${contentVisible ? 'main-content-visible' : 'main-content-hidden'}`}>
        <div className="exact-grid">
          <TransitionLink href="/about" className="grid-area-about">
            <div className="grid-card" ref={refs[0]}>
              <h2>About me</h2>
            </div>
          </TransitionLink>
          
          <TransitionLink href="/work" className="grid-area-work">
            <div className="grid-card" ref={refs[1]}>
              <h2>Work</h2>
            </div>
          </TransitionLink>
          
          <TransitionLink href="/builder" className="grid-area-builder">
            <div className="grid-card" ref={refs[2]}>
              <h2>Builder&apos;s index</h2>
            </div>
          </TransitionLink>
          
          <TransitionLink href="/downloads" className="grid-area-downloads">
            <div className="grid-card" ref={refs[3]}>
              <h2>Downloads</h2>
            </div>
          </TransitionLink>
          
          <div className="grid-area-right">
            <TransitionLink href="/website" className="grid-area-website">
              <div className="grid-card" ref={refs[4]}>
                <h2>Website</h2>
              </div>
            </TransitionLink>
            
            <TransitionLink href="/contact" className="grid-area-contact">
              <div className="grid-card" ref={refs[5]}>
                <h2>Contact</h2>
              </div>
            </TransitionLink>
          </div>
        </div>
      </main>
    </>
  );
}
