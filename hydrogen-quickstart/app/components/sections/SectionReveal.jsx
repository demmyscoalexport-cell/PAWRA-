/**
 * @file SectionReveal.jsx
 * @description Lightweight reveal — skips animation above the fold / reduced motion.
 */

import {motion, useInView, useReducedMotion} from 'framer-motion';
import {useRef} from 'react';

/**
 * @param {{
 *   children: React.ReactNode;
 *   className?: string;
 *   delay?: number;
 *   eager?: boolean;
 * }} props
 */
export function SectionReveal({children, className = '', delay = 0, eager = false}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(ref, {once: true, margin: '-40px'});

  if (eager || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 16}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 16}}
      transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1], delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
