"use client";

import React, { useState, useCallback, memo } from 'react';
import Link from 'next/link';
import { useTransition } from '../context/TransitionContext';
import { usePathname } from 'next/navigation';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TransitionLink: React.FC<TransitionLinkProps> = memo(({ href, children, className = '' }) => {
  const { startTransition } = useTransition();
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();

  // Memoize the click handler to prevent unnecessary rerenders
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Don't do anything if we're already on this page
    if (href === pathname) return;
    
    // Immediate visual feedback that link was clicked
    setIsClicked(true);
    
    // Start the transition using requestAnimationFrame for smoother timing
    requestAnimationFrame(() => {
      startTransition(href);
      
      // Reset the clicked state
      setTimeout(() => setIsClicked(false), 200);
    });
  }, [href, pathname, startTransition]);

  return (
    <Link 
      href={href} 
      onClick={handleClick} 
      className={`${className} ${isClicked ? 'opacity-50 transition-opacity' : ''}`}
      aria-current={href === pathname ? 'page' : undefined}
      prefetch={true} // Enable prefetching for faster navigation
      style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
    >
      {children}
    </Link>
  );
});

TransitionLink.displayName = 'TransitionLink';

export default TransitionLink; 