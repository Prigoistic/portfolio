"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type TransitionContextType = {
  isTransitioning: boolean;
  startTransition: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  startTransition: () => {},
});

export const useTransition = () => useContext(TransitionContext);

type TransitionProviderProps = {
  children: ReactNode;
};

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [href, setHref] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Prefetch common routes for faster transitions
  useEffect(() => {
    const commonRoutes = ['/', '/about', '/work', '/contact', '/builder', '/website', '/downloads'];
    commonRoutes.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  const startTransition = (route: string) => {
    // Don't transition if already on the current page
    if (route === pathname) return;
    
    // Use requestAnimationFrame for smoother animation timing
    requestAnimationFrame(() => {
      setIsTransitioning(true);
      setHref(route);
    });
  };

  useEffect(() => {
    // Apply entrance animation on initial page load
    setIsTransitioning(false);
  }, []);

  useEffect(() => {
    if (isTransitioning && href) {
      // Shorter exit animation for better responsiveness
      const timer = setTimeout(() => {
        router.push(href);
        
        // Reset transition state with minimal delay
        requestAnimationFrame(() => {
          setIsTransitioning(false);
          setHref(null);
        });
      }, 200); // Faster transition time for better performance
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, href, router]);

  useEffect(() => {
    // Handle browser back/forward navigation
    setIsTransitioning(false);
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, startTransition }}>
      <div 
        className={`transition-wrapper ${isTransitioning ? 'page-transition-exit-active' : 'page-fade'}`}
        style={{ willChange: isTransitioning ? 'opacity, transform' : 'auto' }}
      >
        {children}
      </div>
    </TransitionContext.Provider>
  );
}; 