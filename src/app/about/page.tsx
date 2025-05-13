"use client";

import { useEffect, useState, useRef, memo } from 'react';
import TransitionLink from '../../components/TransitionLink';
import ScrollFloat from '../../blocks/TextAnimations/ScrollFloat/ScrollFloat';
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import Dock from '../../blocks/Dock/Dock';
import { useTransition } from '../../context/TransitionContext';

// Memoized icon components to prevent unnecessary re-renders
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

// Add display names for dev tools
HomeIcon.displayName = 'HomeIcon';
AboutIcon.displayName = 'AboutIcon';
ContactIcon.displayName = 'ContactIcon';
WorkIcon.displayName = 'WorkIcon';
BuilderIcon.displayName = 'BuilderIcon';

// Performance-optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      duration: 0.3, 
      ease: "easeOut" 
    },
  },
};

const serviceVariants = {
  hidden: { x: -5, opacity: 0 },
  visible: (custom: number) => ({
    x: 0,
    opacity: 1,
    transition: { 
      duration: 0.2,
      ease: "easeOut",
      delay: custom * 0.03
    },
  }),
};

export default function AboutPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const hireRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  
  // More conservative thresholds for scroll animations
  const isImagesInView = useInView(imagesRef, { once: true, amount: 0.2 });
  const isHireInView = useInView(hireRef, { once: true, amount: 0.2 });
  const isExperienceInView = useInView(experienceRef, { once: true, amount: 0.2 });
  
  const imagesControls = useAnimation();
  const hireControls = useAnimation();
  const experienceControls = useAnimation();
  
  // Get transition method from context
  const { startTransition } = useTransition();
  
  // Handle page load - reduced delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Control animations based on view - optimized to run less frequently
  useEffect(() => {
    if (isImagesInView) {
      imagesControls.start('visible');
    }
    if (isHireInView) {
      hireControls.start('visible');
    }
    if (isExperienceInView) {
      experienceControls.start('visible');
    }
  }, [isImagesInView, isHireInView, isExperienceInView, imagesControls, hireControls, experienceControls]);

  // Constant menu items to prevent recreating on each render
  const dockItems = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => startTransition('/') },
    { icon: <WorkIcon />, label: 'Work', onClick: () => startTransition('/work') },
    { icon: <BuilderIcon />, label: 'Builder', onClick: () => startTransition('/builder') },
    { icon: <AboutIcon />, label: 'About', onClick: () => startTransition('/about') },
    { icon: <ContactIcon />, label: 'Contact', onClick: () => startTransition('/contact') },
  ];

  return (
    <>
      <div 
        className={`about-page-bg min-h-screen transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        ref={contentRef}
        style={{ paddingBottom: '210px' }}
      >
        {/* Nav */}
        <nav className="p-8">
          <div className="max-w-screen-xl mx-auto">
            <TransitionLink href="/" className="text-base font-medium text-gray-400 hover:underline">About</TransitionLink>
          </div>
        </nav>
        <br />
        <br />
        
        {/* Intro - reduced spacing and optimized ScrollFloat */}
        <div className="px-8 pt-16">
          <div className="max-w-screen-xl mx-auto">
            <div className="mb-24" ref={introTextRef}>
              <ScrollFloat 
                containerClassName="mb-16"
                textClassName="about-intro-text"
                scrollStart="top bottom"
                scrollEnd="center center"
                animationDuration={0.8}
                ease="power3.out" 
                stagger={0.015}
              >
                I&apos;m Priyam Ghosh — a software developer and AI/ML researcher who fell a little too hard for tech after watching Sword Art Online & The Social Network. I&apos;m obsessed with digging into the theory, understanding how things work at the core, and building stuff from scratch just for the thrill of it. Whether it&apos;s AI models or random side projects, I like doing too many things at once — and doing them well (or at least obsessing until they are).
              </ScrollFloat>
            </div>
          </div>
        </div>
        
        {/* All three images side by side */}
        <motion.div 
          className="all-images-section px-8 mb-12"
          ref={imagesRef}
          variants={containerVariants}
          initial="hidden"
          animate={imagesControls}
          layout="position"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              <motion.div className="image-column" variants={itemVariants}>
                <div className="image-wrapper">
                  <Image 
                    src="/ninja.jpg" 
                    alt="Ninja" 
                    className="image-item rounded-lg object-cover shadow-lg"
                    width={300}
                    height={450}
                    quality={75}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              </motion.div>
              
              <motion.div className="image-column" variants={itemVariants}>
                <div className="image-wrapper">
                  <Image 
                    src="/me.jpg" 
                    alt="Me" 
                    className="image-item rounded-lg object-cover shadow-lg"
                    width={300}
                    height={450}
                    quality={75}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              </motion.div>
              
              <motion.div className="image-column" variants={itemVariants}>
                <div className="image-wrapper">
                  <Image 
                    src="/kirito.jpg" 
                    alt="Kirito" 
                    className="image-item rounded-lg object-cover shadow-lg"
                    width={300}
                    height={450}
                    quality={75}
                    loading="lazy"
                    priority={false}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Personality text - simplified animation */}
        <motion.div 
          className='hobbies'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Guess this is my personality <motion.span 
            className='spectrum'
            animate={{ 
              opacity: [0.7, 1, 0.7],
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          >spectrum</motion.span>
        </motion.div>
        
        {/* Experience */}
        <motion.div 
          className="experience-section px-8 mb-24"
          ref={experienceRef}
          variants={containerVariants}
          initial="hidden"
          animate={experienceControls}
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <motion.div className="experience-column" variants={itemVariants}>
                <p className="experience-text">
                Currently pursuing <span className='bits'>Computer Science at BITS Pilani </span>, where I juggle coursework, caffeine, and the occasional existential crisis over a semicolon. I got into tech thanks to anime and movies — now I&apos;m knee-deep in code, ML models, and dreams of building something way smarter than me (aka AGI, no pressure).
                </p>
              </motion.div>
              
              <motion.div className="experience-column" variants={itemVariants}>
                <p className="experience-text">
                My research interests revolve around artificial intelligence, with a long-term goal of contributing to AGI — not in a buzzwordy way, but by understanding the underlying mechanics of intelligence itself. Whether it&apos;s building models, reading papers, or prototyping ideas from scratch, I enjoy working on problems that blend complexity, abstraction, and real-world impact. AI isn&apos;t just a tool for me — it&apos;s a field I want to help shape meaningfully.
                </p>
              </motion.div>
              
              <motion.div className="experience-column" variants={itemVariants}>
                <p className="experience-text">
                Outside academics, I spend time on side projects — sometimes practical, sometimes experimental. I enjoy writing clean code, experimenting with ideas, and occasionally overengineering things for fun. Whether solo or in a team, I like seeing things go from concept to deployment. I believe in learning by building, and I&apos;m always looking for opportunities where curiosity meets impact.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Hire me for section */}
        <motion.div 
          className="hire-me-section px-8 mb-24"
          ref={hireRef}
          variants={containerVariants}
          initial="hidden"
          animate={hireControls}
        >
          <div className="max-w-screen-xl mx-auto">
            <motion.h2 
              className="hire-me-title mb-6"
              variants={itemVariants}
            >
              Hire me for
            </motion.h2>
            <div className="hire-me-services">
              <motion.h3 className="service-item" custom={0} variants={serviceVariants}>Website Design (UI/UX)</motion.h3>
              <motion.h3 className="service-item" custom={1} variants={serviceVariants}>Full Stack Development</motion.h3>
              <motion.h3 className="service-item" custom={2} variants={serviceVariants}>AI/ML Research</motion.h3>
              <motion.h3 className="service-item" custom={3} variants={serviceVariants}>Custom LLM Model Development</motion.h3>
              <motion.h3 className="service-item" custom={4} variants={serviceVariants}>Public Speaking</motion.h3>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Dock Component - Now rendered via portal with memoized items */}
      <Dock
        items={dockItems}
        baseItemSize={84}
        magnification={98}
        panelHeight={114}
        distance={105}
        spring={{ mass: 1, stiffness: 300, damping: 30 }}
      />
    </>
  );
} 