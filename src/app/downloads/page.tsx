"use client";

import Link from 'next/link';
import { useEffect, useState, memo } from 'react';
import Dock from '../../blocks/Dock/Dock';
import { useTransition } from '../../context/TransitionContext';
import styles from './downloads.module.css';

type DownloadResource = {
  id: number;
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
};

const resources: DownloadResource[] = [
  {
    id: 1,
    title: "Résumé / CV",
    description: "My latest professional résumé detailing my experience, skills, and education.",
    fileType: "PDF",
    fileSize: "412 KB",
    downloadUrl: "#resume" // In a real implementation, this would point to an actual file
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

export default function DownloadsPage() {
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
          <span className={styles.header}>Downloads</span>
        </header>

        {/* Main Content */}
        <main>
          <Link href="/" className={styles.backLink}>← Home</Link>
          
          <h1 className={styles.title}>
            <span className={styles.typewriter} style={interFontStyle}>
              Files for you.
            </span>
          </h1>
          
          <div className={styles.contentSection}>
            <p className={styles.description}>
              Resources available for download. Feel free to grab my résumé to learn more about my professional background.
            </p>
          </div>
          
          <div className={styles.downloadSection}>
            {resources.map((resource) => (
              <div key={resource.id} className={styles.downloadCard}>
                <div className={styles.downloadHeader}>
                  <h2 className={styles.downloadTitle} style={interFontStyle}>{resource.title}</h2>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileType}>{resource.fileType}</span>
                    <span className={styles.fileSize}>{resource.fileSize}</span>
                  </div>
                </div>
                <p className={styles.downloadDescription} style={interFontStyle}>{resource.description}</p>
                <a 
                  href={resource.downloadUrl} 
                  className={styles.downloadButton}
                  style={interFontStyle}
                  download
                >
                  Download
                </a>
              </div>
            ))}
          </div>
          
          <div className={styles.contactSection}>
            <h2 className={styles.sectionTitle} style={interFontStyle}>Need Something Specific?</h2>
            <p className={styles.description} style={interFontStyle}>
              If you're looking for additional resources or have specific requirements, please don't hesitate to reach out.
            </p>
            <Link 
              href="/contact" 
              className={styles.contactLink}
              style={interFontStyle}
            >
              Get in Touch
            </Link>
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