"use client";

import { useRef, memo } from 'react';
import TransitionLink from '../../components/TransitionLink';
import Image from 'next/image';
import Link from 'next/link';
import Dock from '../../blocks/Dock/Dock';
import { useTransition } from '../../context/TransitionContext';

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

// Define project type interface
interface WorkProject {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  link?: string;
}

// Project data
const projects: WorkProject[] = [
  {
    id: 1,
    title: "Ananta (V1) : The best scientific reasoning LLM model",
    description: "Ananta is a lightweight,fine-tuned LLM built for advanced maths and science reasoning using parameter-efficient training methods",
    tags: ["Transformers", "Lora", "RLHF/PPO", "Python"],
    image: "/ananta.jpg",
    year: "2024",
    link : "https://github.com/Prigoistic/Ananta"
  },
  {
    id: 2,
    title: "Mitra.ai : Your Everyday Study Buddy",
    description: "Your saviour in last moment of exams, learn anything in 10 minutes with the help of Mitra.ai and its unique flashcard feature making it the best study buddy.",
    tags: ["Next.js", "Framer Motion", "AI API", "Styled Components"],
    image: "/mitr.png",
    year: "2024",
    link: "https://github.com/Prigoistic/Mitra.AI"
  },
  {
    id: 3,
    title: "Percevia : Vision Assistance App",
    description: "Vision Assistance App – A smart navigation tool for visually impaired users Detects objects in a 9-quadrant grid, provides distance via vibrations, and offers haptic feedback. Features emergency alerts, GPS, voice assistance, and AI recognition. Independence redefined!",
    tags: ["React", "JavaScript", "Tailwind CSS", "News API"],
    image: "/percivia.png",
    year: "2023",
    link: "https://github.com/NeuralSynth/Vision"
  },
  {
    id: 4,
    title: "GridLine: An F1 Dashboard for all F1 enthusiasts",
    description: "GridLine is a dashboard for all F1 enthusiasts to stay updated with the latest happenings in the world of F1.",
    tags: ["FastF1", "Python", "Matplotlib", "Polars"],
    image: "/f1.png",
    year: "2023",
    
  },
  {
    id: 5,
    title: "TravelXP.ai : The AI-Powered Travel Planning Suite",
    description: "An intelligent travel planning platform combining AI-generated itineraries with real-time mapping and weather integration.",
    tags: ["React", "JavaScript", "Shadcn UI", "Firebase","Google Maps API", "Leaflet.js"],
    image: "/travel.png",
    year: "2021",
    link: "https://github.com/Prigoistic/TravelXP.ai"
  },
  {
    id: 6,
    title: "Cognito : A Dynamic News Application",
    description: "Cognito is a dynamic news application that allows you to stay updated with the latest news from around the world.",
    tags: ["React", "JavaScript", "Tailwind CSS", "News API"],
    image: "/news.png",
    year: "2023",
    link: "https://github.com/Prigoistic/Cognito"
  }
];

// Skip the complex animations for now
const ProjectCard = memo(({ project }: { project: WorkProject }) => {
  return (
    <div style={{ 
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transform: 'translateZ(0)'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        backgroundColor: '#1a1a1a'
      }}>
        <Image 
          src={project.image} 
          alt={project.title}
          width={500}
          height={350}
          quality={90}
          loading="eager"
          style={{ 
            objectFit: 'cover', 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        />
        <div style={{ 
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>{project.year}</div>
      </div>
      
      <div style={{ padding: '1.5rem', flex: 1 }}>
        <h3 style={{ 
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '0.75rem',
          color: 'white'
        }}>{project.title}</h3>
        <p style={{ 
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1.5rem',
          lineHeight: 1.5,
          fontSize: '0.95rem'
        }}>{project.description}</p>
        
        <div style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {project.tags.map((tag, index) => (
            <span key={index} style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.8)',
              padding: '0.35rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.8rem'
            }}>{tag}</span>
          ))}
        </div>
        
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              fontWeight: 500,
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textDecoration: 'none'
            }}
          >
            View Project
          </a>
        )}
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default function WorkPage() {
  // State and refs
  const contentRef = useRef<HTMLDivElement>(null);
  
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

  return (
    <>
      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div 
          ref={contentRef}
          style={{ 
            paddingBottom: '120px',
            backgroundColor: '#111',
            color: '#fff',
            minHeight: '100vh'
          }}
        >
          {/* Navigation */}
          <nav style={{ padding: '2rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <TransitionLink href="/" className="text-base font-medium text-gray-400 hover:underline">
                Home
              </TransitionLink>
              <span style={{ margin: '0 0.5rem', color: '#666' }}>/</span>
              <span style={{ color: 'white', fontWeight: 500 }}>Work</span>
            </div>
          </nav>
          
          {/* Intro */}
          <div style={{ padding: '2rem', paddingTop: '4rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ marginBottom: '6rem' }}>
                <h1 style={{ 
                  fontSize: 'clamp(1.66rem, 3.74vw, 3.23rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                  marginBottom: '2.5rem',
                  color: 'white'
                }}>
                  Selected projects showcasing my creative work in front-end development, UI/UX design, and interactive experiences. Each piece represents my passion for crafting beautiful digital solutions.
                </h1>
              </div>
            </div>
          </div>
          
          {/* Projects Grid - Simpler implementation */}
          <div style={{ padding: '0 2rem', marginBottom: '6rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div style={{ 
            padding: '3rem 2rem',
            marginBottom: '4rem',
            textAlign: 'center',
            backgroundColor: 'rgba(20, 20, 20, 0.7)',
            maxWidth: '1200px',
            margin: '0 auto',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h2 style={{ 
              fontSize: '2rem',
              color: 'white',
              marginBottom: '1.5rem',
              fontWeight: 700
            }}>Let&apos;s create something amazing together</h2>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '1.5rem',
              maxWidth: '600px',
              margin: '0 auto 2rem',
              lineHeight: 1.6
            }}>
              I&apos;m currently available for freelance projects and collaboration opportunities.
              Whether you need a website, interactive experience, or custom UI components,
              I&apos;d love to hear about your project.
            </p>
            <Link 
              href="/contact" 
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                color: 'black',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
                textDecoration: 'none'
              }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* Dock Component - Rendered via portal with memoized items */}
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