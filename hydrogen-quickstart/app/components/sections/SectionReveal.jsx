/**
 * ╔═══════════════════════════════════════╗
 * ║          PAWRA PET SHOP               ║
 * ║    Premium Pets Products Store        ║
 * ║         pawrapetshop.com              ║
 * ║          © 2025 Pawra LLC             ║
 * ╚═══════════════════════════════════════╝
 */

/**
 * @file SectionReveal.jsx
 * @description Homepage/marketing section: SectionReveal.
 * @author Pawra LLC
 * @website pawrapetshop.com
 */

import {motion, useInView} from 'framer-motion';
import {useRef} from 'react';

export function SectionReveal({children, className = '', delay = 0}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true, margin: '-60px'});

  return (
    <motion.div
      ref={ref}
      initial={{opacity: 0, y: 40}}
      animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 40}}
      transition={{duration: 0.65, ease: [0.22, 1, 0.36, 1], delay}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
