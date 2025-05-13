"use client";

import { useRef, memo, useEffect } from 'react';
import TransitionLink from '../../components/TransitionLink';
import Link from 'next/link';
import Dock from '../../blocks/Dock/Dock';
import { useTransition } from '../../context/TransitionContext';
import { motion, useAnimation, useScroll, useInView } from 'framer-motion';

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

// Add display names for React DevTools
HomeIcon.displayName = 'HomeIcon';
AboutIcon.displayName = 'AboutIcon';
ContactIcon.displayName = 'ContactIcon';
WorkIcon.displayName = 'WorkIcon';
BuilderIcon.displayName = 'BuilderIcon';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

// Types
type BuilderPrinciple = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

type ToolkitItem = {
  id: number;
  name: string;
  category: 'design' | 'frontend' | 'backend' | 'tools' | 'ml';
  level: number; // 1-5 for skill level
  description?: string;
};

type WorkflowStep = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

// Builder principles data with icons and colors
const principles: BuilderPrinciple[] = [
  {
    id: 1,
    title: "Design + Code Integration",
    description: "The best digital products emerge when design and development work in harmony. I bridge both worlds to create cohesive, functional experiences that look great and perform well.",
    icon: "🔄"
  },
  {
    id: 2,
    title: "Performance-First Approach",
    description: "Speed and responsiveness are fundamental to good UX. I optimize every aspect of an application for maximum performance without compromising visual quality.",
    icon: "⚡"
  },
  {
    id: 3,
    title: "Thoughtful Interaction",
    description: "Interactions should feel natural and purposeful. I craft intuitive experiences that guide users through complex actions with minimal friction.",
    icon: "👆"
  },
  {
    id: 4,
    title: "Adaptable Architecture",
    description: "Building for the future means creating systems that can evolve. I develop flexible architectures that scale and adapt to changing requirements.",
    icon: "🏗️"
  },
  {
    id: 5,
    title: "Accessible By Default",
    description: "Accessibility isn't an add-on, it's a foundation. I build with inclusive design patterns that work for everyone, regardless of ability or context.",
    icon: "♿"
  }
];

// Toolkit data with descriptions
const toolkit: ToolkitItem[] = [
  // Frontend tools
  { id: 1, name: "React", category: "frontend", level: 5, description: "Expert in building complex React applications" },
  { id: 2, name: "Next.js", category: "frontend", level: 4, description: "Experienced with server-side rendering and static site generation" },
  { id: 3, name: "JavaScript", category: "frontend", level: 5, description: "Expert in modern JavaScript, ES6+ features" },
  { id: 4, name: "HTML", category: "frontend", level: 5, description: "Expert in semantic markup and accessibility" },
  { id: 5, name: "CSS", category: "frontend", level: 5, description: "Expert in layouts, animations, and responsive design" },
  { id: 6, name: "React Native", category: "frontend", level: 4, description: "Skillful in cross-platform mobile development" },
  { id: 7, name: "jQuery", category: "frontend", level: 2, description: "Familiar with basic DOM manipulation" },
  
  // Backend tools
  { id: 8, name: "Node.js", category: "backend", level: 4, description: "Experienced in server-side JavaScript runtime" },
  { id: 9, name: "Python", category: "backend", level: 4, description: "Experienced in data processing and API development" },
  { id: 10, name: "Firebase", category: "backend", level: 4, description: "Skillful with authentication, database, and cloud functions" },
  { id: 11, name: "Django", category: "backend", level: 4, description: "Skillful in building robust backend applications" },
  { id: 12, name: "Flask", category: "backend", level: 4, description: "Experienced with lightweight Python web frameworks" },
  { id: 13, name: "FASTApi", category: "backend", level: 4, description: "Skillful in high-performance API development" },
  { id: 14, name: "MongoDB", category: "backend", level: 4, description: "Skillful with document databases" },
  { id: 15, name: "MySQL", category: "backend", level: 4, description: "Skillful in relational database design" },
  { id: 16, name: "PostgreSQL", category: "backend", level: 4, description: "Skillful with advanced PostgreSQL features" },
  
  // Dev Tools
  { id: 17, name: "Git", category: "tools", level: 4, description: "Experienced in version control and collaboration" },
  { id: 18, name: "AWS", category: "tools", level: 2, description: "Beginner knowledge of cloud services and deployment" },
  { id: 19, name: "Java", category: "tools", level: 4, description: "Skillful in object-oriented programming" },
  { id: 20, name: "C++", category: "tools", level: 1, description: "Basic syntax knowledge" },
  { id: 21, name: "C#", category: "tools", level: 2, description: "Good in game development" },
  { id: 22, name: "MATLAB", category: "tools", level: 4, description: "Experienced in numerical computing" },
  { id: 23, name: "Docker", category: "tools", level: 2, description: "Experienced in containerization and deployment" },
  { id: 24, name: "Kubernetes", category: "tools", level: 2, description: "Experienced in container orchestration" },
  
  // Machine Learning & AI
  { id: 21, name: "PyTorch", category: "ml", level: 4, description: "Proficient in deep learning model development" },
  { id: 22, name: "TensorFlow", category: "ml", level: 4, description: "Experienced with ML workflows and neural networks" },
  { id: 23, name: "Polars,Pandas", category: "ml", level: 3, description: "Skillful with high-performance data processing" },
  { id: 24, name: "MXNet", category: "ml", level: 3, description: "Competent in building scalable deep learning models" },
  { id: 25, name: "Keras", category: "ml", level: 3, description: "Application in sequence modeling and NLP" },
  { id: 26, name: "Fortran", category: "ml", level: 3, description: "Legacy scientific computing and numerical analysis" },
  { id: 27, name: "Scikit-learn", category: "ml", level: 4, description: "Experienced with classical ML algorithms" },
  { id: 28, name: "Hugging Face Transformers", category: "ml", level: 4, description: "Application in NLP and LLMs" }
];

// Workflow steps with icons
const workflowSteps: WorkflowStep[] = [
  {
    id: 1,
    title: "Discovery",
    description: "Understanding requirements, researching user needs, and mapping out technical constraints.",
    icon: "🔍"
  },
  {
    id: 2,
    title: "Design",
    description: "Creating wireframes and prototypes with a focus on both aesthetics and technical feasibility.",
    icon: "✏️"
  },
  {
    id: 3,
    title: "Development",
    description: "Building with clean, maintainable code that brings designs to life with precise attention to detail.",
    icon: "💻"
  },
  {
    id: 4,
    title: "Optimization",
    description: "Refining performance, accessibility, and making data-driven improvements.",
    icon: "📈"
  }
];

// Expertise categories for skill level legend
const expertiseCategories = [
  { label: "Expert", description: "Deep knowledge and extensive experience" },
  { label: "Proficient", description: "Strong skills and regular usage" },
  { label: "Competent", description: "Good working knowledge" },
  { label: "Familiar", description: "Basic understanding and limited experience" }
];

// Common card container style for tech stack sections
const cardContainerStyle = {
  backgroundColor: 'rgba(22, 22, 22, 0.9)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
  padding: '1.25rem'
};

// Enhanced principle card component with animations
const PrincipleCard = memo(({ principle, index }: { principle: BuilderPrinciple; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: index * 0.1 } }
      }}
      whileHover={{ scale: 1.03 }}
      style={{ 
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '3px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.7)',
        }}
      />
      
      <div style={{ 
        fontSize: '2.25rem', 
        marginBottom: '1rem',
        opacity: 0.9 
      }}>
        {principle.icon}
      </div>
      
      <h3 style={{ 
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '0.75rem',
        color: 'white',
        letterSpacing: '-0.01em'
      }}>{principle.title}</h3>
      
      <p style={{ 
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 1.5,
        fontSize: '0.95rem'
      }}>{principle.description}</p>
    </motion.div>
  );
});

PrincipleCard.displayName = 'PrincipleCard';

// Enhanced skill level indicator with monochrome styling
const SkillLevel = memo(({ level }: { level: number }) => {
  return (
    <div style={{ display: 'flex', gap: '3px', height: '4px' }}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <motion.div
          key={dot}
          initial={{ width: 0 }}
          animate={{ width: '4px' }}
          transition={{ 
            duration: 0.5, 
            delay: dot * 0.1,
            ease: "easeOut" 
          }}
          style={{
            height: '4px',
            borderRadius: '2px',
            backgroundColor: dot <= level 
              ? 'rgba(255, 255, 255, 0.85)' 
              : 'rgba(255, 255, 255, 0.2)'
          }}
        />
      ))}
    </div>
  );
});

SkillLevel.displayName = 'SkillLevel';

// Tool card component with monochrome styling
const ToolCard = memo(({ tool, index }: { tool: ToolkitItem; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { 
          opacity: 1, 
          x: 0, 
          transition: { 
            duration: 0.3, 
            delay: index * 0.05 
          } 
        }
      }}
      style={{ 
        marginBottom: '0.75rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '8px',
        padding: '10px 14px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ 
        fontSize: '1rem', 
        fontWeight: 500, 
        color: 'white', 
        letterSpacing: '-0.01em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {tool.name}
        <SkillLevel level={tool.level} />
      </div>
      {tool.description && (
        <p style={{ 
          fontSize: '0.8rem', 
          opacity: 0.7, 
          marginTop: '4px',
          lineHeight: 1.4
        }}>
          {tool.description}
        </p>
      )}
    </motion.div>
  );
});

ToolCard.displayName = 'ToolCard';

// Workflow step card with monochrome styling
const WorkflowStep = memo(({ step, index }: { step: WorkflowStep; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { 
            duration: 0.5, 
            delay: index * 0.12 
          } 
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      style={{
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div style={{ 
        fontSize: '2.25rem', 
        marginBottom: '0.5rem',
        textAlign: 'center'
      }}>
        {step.icon}
      </div>
      <div style={{
        position: 'relative',
        textAlign: 'center',
        paddingBottom: index < 3 ? '2rem' : 0
      }}>
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: 600, 
          marginBottom: '0.75rem',
          color: 'white',
          letterSpacing: '-0.01em'
        }}>
          {index + 1}. {step.title}
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6 }}>
          {step.description}
        </p>
        
        {index < 3 && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '2rem' }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              width: '1px',
              background: 'rgba(255, 255, 255, 0.2)'
            }}
          />
        )}
      </div>
    </motion.div>
  );
});

WorkflowStep.displayName = 'WorkflowStep';

export default function BuilderPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  // Avoid linter errors for unused scroll progress and InView states
  useScroll(); 
  
  // Refs for scroll animations
  const introRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const workflowRef = useRef<HTMLDivElement>(null);
  
  // Controls for sequenced animations
  const introControls = useAnimation();
  const principlesControls = useAnimation();
  const techStackControls = useAnimation();
  const workflowControls = useAnimation();
  
  // Filter toolkit by category
  const frontendTools = toolkit.filter(tool => tool.category === 'frontend');
  const backendTools = toolkit.filter(tool => tool.category === 'backend');
  const developmentTools = toolkit.filter(tool => tool.category === 'tools');
  const mlTools = toolkit.filter(tool => tool.category === 'ml');
  
  // Get transition method from context
  const { startTransition } = useTransition();
  
  // Memoized dock items
  const dockItems = [
    { icon: <HomeIcon />, label: 'Home', onClick: () => startTransition('/') },
    { icon: <WorkIcon />, label: 'Work', onClick: () => startTransition('/work') },
    { icon: <BuilderIcon />, label: 'Builder', onClick: () => startTransition('/builder') },
    { icon: <AboutIcon />, label: 'About', onClick: () => startTransition('/about') },
    { icon: <ContactIcon />, label: 'Contact', onClick: () => startTransition('/contact') },
  ];
  
  // Handle scroll animations
  useEffect(() => {
    // Immediately start animations on component mount
    introControls.start('visible');
    principlesControls.start('visible');
    techStackControls.start('visible');
    workflowControls.start('visible');
    
  }, [introControls, principlesControls, techStackControls, workflowControls]);

  // Common font style for text - using Inter font family
  const fontStyle = {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  // Common heading styles with Inter font
  const headingStyle = {
    ...fontStyle,
    fontWeight: 600,
    color: 'white',
  };

  // Common paragraph styles with Inter font
  const paragraphStyle = {
    ...fontStyle,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 1.6,
  };

  // Grid columns based on available categories
  const techStackGridColumns = 'repeat(auto-fit, minmax(320px, 1fr))';

  return (
    <>
      <div 
        ref={contentRef}
        style={{ 
          paddingBottom: '120px',
          backgroundColor: '#111',
          color: '#fff',
          minHeight: '100vh',
          ...fontStyle
        }}
      >
        {/* Navigation */}
        <nav style={{ padding: '1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <TransitionLink href="/" className="text-gray-400 hover:text-white">
              Home
            </TransitionLink>
            <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
            <span style={{ ...fontStyle, color: 'white', fontWeight: 500 }}>Builder&apos;s Index</span>
          </div>
        </nav>
        
        {/* Hero section */}
        <div
          style={{ 
            padding: '1.5rem',
            paddingTop: '2rem',
            position: 'relative'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div 
              ref={introRef}
              initial="visible"
              animate={introControls}
              variants={staggerContainer}
              style={{ marginBottom: '4rem' }}
            >
              <motion.div variants={fadeIn}>
                <h1 style={{ 
                  ...headingStyle,
                  fontSize: 'clamp(1.66rem, 3.74vw, 3.23rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                  position: 'relative',
                  letterSpacing: '-0.02em'
                }}>
                  <span style={{ 
                    display: 'inline-block',
                    position: 'relative',
                    borderBottom: '2px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    Design + Development
                  </span>{' '}
                  working in harmony to create end-to-end solutions where aesthetic polish meets technical excellence.
                </h1>
              </motion.div>
              
              <motion.p 
                variants={fadeIn}
                style={{ 
                  ...paragraphStyle,
                  fontSize: '1.25rem',
                  maxWidth: '800px'
                }}
              >
                My hybrid background allows me to understand the full product lifecycle and speak 
                both languages fluently. I build cohesive, scalable digital experiences.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Builder Principles */}
        <div style={{ padding: '0 1.5rem', marginBottom: '4rem' }} ref={principlesRef}>
          <motion.div 
            style={{ maxWidth: '1200px', margin: '0 auto' }}
            initial="visible"
            animate={principlesControls}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeIn}
              style={{ 
                ...headingStyle,
                fontSize: '2rem',
                marginBottom: '2rem',
                textAlign: 'center',
                letterSpacing: '-0.01em'
              }}
            >
              Builder Principles
            </motion.h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {principles.map((principle, index) => (
                <PrincipleCard key={principle.id} principle={principle} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Tech Stack */}
        <div style={{ 
          padding: '0 1.5rem',
          marginTop: '0',
          marginBottom: '5rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '1200px'
         }} ref={techStackRef}>
          <motion.div 
            initial="visible"
            animate={techStackControls}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeIn}
              style={{ 
                ...headingStyle,
                fontSize: '1.9rem',
                marginBottom: '2rem',
                textAlign: 'center',
                letterSpacing: '-0.01em'
              }}
            >
              Tech Stack
            </motion.h2>
            
            {/* Expertise Level Legend */}
            <motion.div
              variants={fadeIn}
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                backgroundColor: 'rgba(20, 20, 20, 0.6)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                width: 'fit-content',
                margin: '0 auto 2rem'
              }}
            >
              {expertiseCategories.map((category, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '2px',
                    backgroundColor: 'white',
                    opacity: 1 - (index * 0.2)
                  }} />
                  <div style={{ 
                    ...fontStyle, 
                    fontSize: '0.75rem', 
                    fontWeight: 600 
                  }}>
                    {category.label}
                  </div>
                </div>
              ))}
            </motion.div>
            
            {/* Tech Stack Categories */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: techStackGridColumns,
              gap: '1.5rem',
              marginBottom: '1.5rem'
            }}>
              {/* Frontend Tech */}
              <motion.div 
                variants={fadeIn}
                style={{
                  ...cardContainerStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ 
                  ...headingStyle,
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#fff'
                  }}></span>
                  Frontend
                </h3>
                <div>
                  {frontendTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </motion.div>
            
              {/* Backend & Databases */}
              <motion.div 
                variants={fadeIn}
                style={{
                  ...cardContainerStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ 
                  ...headingStyle,
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#fff'
                  }}></span>
                  Backend & Databases
                </h3>
                <div>
                  {backendTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Second row of Tech Stack Categories */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: techStackGridColumns,
              gap: '1.5rem'
            }}>
              {/* Machine Learning & AI */}
              <motion.div 
                variants={fadeIn}
                style={{
                  ...cardContainerStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ 
                  ...headingStyle,
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#fff'
                  }}></span>
                  Machine Learning & AI
                </h3>
                <div>
                  {mlTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </motion.div>
              
              {/* Dev Tools & Languages */}
              <motion.div 
                variants={fadeIn}
                style={{
                  ...cardContainerStyle,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3 style={{ 
                  ...headingStyle,
                  fontSize: '1.2rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '0.5rem'
                }}>
                  <span style={{
                    display: 'inline-block',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#fff'
                  }}></span>
                  Dev Tools & Languages
                </h3>
                <div>
                  {developmentTools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Project workflow section */}
        <div style={{ padding: '0 1.5rem', marginBottom: '4rem' }} ref={workflowRef}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ 
              ...headingStyle,
              fontSize: '2rem',
              marginBottom: '1.5rem',
              letterSpacing: '-0.01em'
            }}>
              My End-to-End Workflow
            </h2>
            
            <div style={{ 
              backgroundColor: 'rgba(30, 30, 30, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              padding: '1.5rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
              }}>
                {workflowSteps.map((step, index) => (
                  <WorkflowStep key={step.id} step={step} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div style={{ 
          padding: '2rem 1.5rem',
          marginBottom: '3rem',
          textAlign: 'center',
          backgroundColor: 'rgba(20, 20, 20, 0.7)',
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <h2 style={{ 
            ...headingStyle,
            fontSize: '2rem',
            marginBottom: '1rem',
            letterSpacing: '-0.01em'
          }}>Need someone who can both design and develop?</h2>
          <p style={{ 
            ...paragraphStyle,
            marginBottom: '1.5rem',
            maxWidth: '600px',
            margin: '0 auto 1.5rem',
          }}>
            I offer end-to-end solutions from concept to deployment. Let&apos;s collaborate on your next digital product
            and create something that&apos;s both beautiful and technically excellent.
          </p>
          <Link 
            href="/contact" 
            style={{
              ...fontStyle,
              display: 'inline-block',
              backgroundColor: 'white',
              color: 'black',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1.1rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              textDecoration: 'none'
            }}
          >
            Get in touch
          </Link>
        </div>
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
    </>
  );
} 