'use client';

import { useEffect, useState } from 'react';

interface ScrollDirection {
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  scrollY: number;
}

export const useScrollDirection = (): ScrollDirection => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>({
    isScrollingUp: false,
    isScrollingDown: false,
    scrollY: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection({
        isScrollingUp: currentScrollY < lastScrollY,
        isScrollingDown: currentScrollY > lastScrollY,
        scrollY: currentScrollY,
      });
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};