"use client";

import Link from 'next/link';
import { useEffect, useState, memo } from 'react';
import { useTransition } from '../../context/TransitionContext';
import Dock from '../../blocks/Dock/Dock';
import styles from './website.module.css';

type TechStack = {
  id: number;
  name: string;
  description: string;
  url: string;
};

const techStack: TechStack[] = [
  {
    id: 1,
    name: "Next.js",
    description: "React framework for building server-rendered applications and static websites.",
    url: "https://nextjs.org/"
  },
  {
    id: 2,
    name: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript.",
    url: "https://www.typescriptlang.org/"
  },
  {
    id: 3,
    name: "Framer Motion",
    description: "Production-ready motion library for React to create animations.",
    url: "https://www.framer.com/motion/"
  },
  {
    id: 4,
    name: "CSS Modules",
    description: "CSS files in which all class names and animation names are scoped locally by default.",
    url: "https://github.com/css-modules/css-modules"
  }
];

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

export default function WebsitePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Get transition method from context
  const { startTransition } = useTransition();
  
  // Font style to ensure Inter is used
  const interFontStyle = { fontFamily: "var(--font-inter), sans-serif" };

  // Dock items
  const dockItems = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => startTransition('/') },
    { icon: <WorkIcon />, label: 'Work', onClick: () => startTransition('/work') },
    { icon: <BuilderIcon />, label: 'Builder', onClick: () => startTransition('/builder') },
    { icon: <AboutIcon />, label: 'About', onClick: () => startTransition('/about') },
    { icon: <ContactIcon />, label: 'Contact', onClick: () => startTransition('/contact') },
  ];

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
      <div 
        className={`${styles.container} ${isLoaded ? styles.fadeIn : 'opacity-0'} use-inter`} 
        style={interFontStyle}
      >
        {/* Header */}
        <header>
          <span className={styles.header}>Website</span>
        </header>

        {/* Main Content */}
        <main>
          <Link href="/" className={styles.backLink}>← Home</Link>
          
          <h1 className={styles.title}>
            <span className={styles.typewriter} style={interFontStyle}>
              The story behind this portfolio.
            </span>
          </h1>
          
          <div className={styles.contentSection}>
            <p className={styles.description}>
              This portfolio website was designed and developed by me as a showcase of my design
              philosophy and technical abilities. It combines minimalist aesthetics with smooth
              interactions to create an engaging experience.
            </p>
            
            <p className={styles.description}>
              The site follows a bento-grid inspired layout with responsive cards that adapt
              to different screen sizes. Typography is set in Inter for body text and Space Grotesk
              for headings, creating a clean, modern feel with good readability.
            </p>
          </div>
          
          <h2 className={styles.sectionTitle} style={interFontStyle}>Technology Stack</h2>
          
          <div className={styles.techGrid}>
            {techStack.map((tech) => (
              <div key={tech.id} className={styles.techCard}>
                <h3 className={styles.techTitle} style={interFontStyle}>{tech.name}</h3>
                <p className={styles.techDescription} style={interFontStyle}>{tech.description}</p>
                <a 
                  href={tech.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.techLink}
                  style={interFontStyle}
                >
                  Learn more →
                </a>
              </div>
            ))}
          </div>
          
          <div className={styles.designSection}>
            <h2 className={styles.sectionTitle} style={interFontStyle}>Design Principles</h2>
            <ul className={styles.designList}>
              <li>Responsive design that works well on all devices</li>
              <li>Minimal, content-focused layout to highlight the work</li>
              <li>Subtle animations to enhance the user experience</li>
              <li>Careful typographic choices for readability and style</li>
              <li>Consistent design language across all pages</li>
              <li>Optimal performance and accessibility</li>
            </ul>
          </div>
        </main>
      </div>
      
      {/* Dock Component */}
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