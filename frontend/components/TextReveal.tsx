import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  width?: 'fit-content' | '100%';
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  width = 'fit-content'
}) => {
  const el = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const chars = el.current?.querySelectorAll('.char');

      if (chars && chars.length > 0) {
        gsap.fromTo(chars,
          {
            y: 100,
            opacity: 0,
            rotateX: -90
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.02,
            duration: 1,
            ease: 'power4.out',
            delay: delay,
            scrollTrigger: {
              trigger: el.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const splitText = children.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block"
      style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
    >
      {char}
    </span>
  ));

  return (
    <div ref={el} className={`${className} overflow-hidden`} style={{ width }}>
      <span className="sr-only">{children}</span>
      <div aria-hidden="true">
        {splitText}
      </div>
    </div>
  );
};

export default TextReveal;
