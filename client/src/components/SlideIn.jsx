// SlideIn.jsx
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SlideIn({
  children,
  axis = "x",          // "x" or "y"
  offset = 80,
  delay = 0,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.2 }); // ~20% visible to trigger
  const controls = useAnimation();

  const hidden = {
    x: axis === "x" ? offset : 0,
    y: axis === "y" ? offset : 0,
    opacity: 0,
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut", delay },
      });
    } else {
      // reset so it can play again on re-enter
      controls.start({ ...hidden, transition: { duration: 0.001 } });
    }
  }, [inView, controls, delay, axis, offset]);

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={controls}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
