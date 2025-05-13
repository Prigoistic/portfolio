"use client";

import { useEffect, useState, memo } from 'react';
import { useTransition } from '../../context/TransitionContext';
import Dock from '../../blocks/Dock/Dock';
import styles from './contact.module.css';

// Icon Components
const HomeIcon = memo(() => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
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

// Display names for dev tools
HomeIcon.displayName = 'HomeIcon';
WorkIcon.displayName = 'WorkIcon';
BuilderIcon.displayName = 'BuilderIcon';
AboutIcon.displayName = 'AboutIcon';
ContactIcon.displayName = 'ContactIcon';

export default function ContactPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { startTransition } = useTransition();
  
  // Font style to ensure Inter is used
  const interFontStyle = { fontFamily: "var(--font-inter), sans-serif" };

  // Dock items configuration
  const dockItems = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => startTransition('/') },
    { icon: <WorkIcon />, label: 'Work', onClick: () => startTransition('/work') },
    { icon: <BuilderIcon />, label: 'Builder', onClick: () => startTransition('/builder') },
    { icon: <AboutIcon />, label: 'About', onClick: () => startTransition('/about') },
    { icon: <ContactIcon />, label: 'Contact', onClick: () => startTransition('/contact') },
  ];

  // Set loaded state after component mounts
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    try {
      timer = setTimeout(() => {
        setIsLoaded(true);
      }, 50);
    } catch (error) {
      console.error("Error in timeout:", error);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Main Content */}
      <div 
        className={`${styles.container} ${isLoaded ? styles.fadeIn : 'opacity-0'} use-inter`} 
        style={interFontStyle}
      >
        {/* Header */}
        <header>
          <span className={styles.header}>Contact</span>
        </header>
        
        {/* Main content */}
        <main>
          <h1 className={`${styles.title} ${styles.typewriter}`} style={interFontStyle}>
            Now, I&apos;d love to hear about you. Send me a message.
          </h1>
          
          <div className={styles.contactInfo}>
            <a 
              href="mailto:priyamghosh9753@gmail.com" 
              className={styles.contactEmail}
              style={interFontStyle}
            >
              priyamghosh9753@gmail.com
            </a>
            
          </div>
        </main>
        
        {/* Social Links - Right aligned */}
        <aside className={styles.socialContainer}>
          <p className={styles.socialLabel} style={interFontStyle}>Follow me on</p>
          <nav className={styles.socialLinks}>
            <a 
              href="https://github.com/Prigoistic" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={interFontStyle}
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/prigo.py/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={interFontStyle}
            >
              Instagram
            </a>
            <a 
              href="https://www.linkedin.com/in/priyam-ghosh-252076231/" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={interFontStyle}
            >
              LinkedIn
            </a>
            <a 
              href="https://x.com/PriyamG64932451?t=QgsQzOC0w8qk2WgHTapmLw&s=08" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={interFontStyle}
            >
              X
            </a>
          </nav>
        </aside>
        
        {/* Footer */}
        <footer className={styles.footer}>
          <a 
            href="mailto:priyamghosh9753@gmail.com"
            className={styles.footerEmail}
            style={interFontStyle}
          >
            priyamghosh9753@gmail.com
          </a>
          
        </footer>
      </div>
      
      {/* Dock Component - with error handling */}
      <Dock
        items={dockItems}
        baseItemSize={84}
        magnification={98}
        panelHeight={114}
        distance={105}
        spring={{ mass: 1, stiffness: 300, damping: 30 }}
      />
    </div>
  );
} 