import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  direction = 'up',
  delay = 0,
  duration = 0.8,
  stagger = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const x = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
    const y = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;

    gsap.fromTo(
      element.children,
      {
        opacity: 0,
        x,
        y,
        visibility: 'hidden' // Prevent FOUC
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        visibility: 'visible',
        duration,
        delay,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%", // Trigger when top of element hits 85% of viewport height
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [direction, delay, duration, stagger]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
