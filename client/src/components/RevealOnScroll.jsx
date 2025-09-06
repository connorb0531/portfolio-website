// src/components/RevealOnScroll.jsx
import { useEffect } from "react";
import { useAnimate, useInView, stagger } from "framer-motion";

export default function RevealOnScroll({
    children,
    selectors = "input, textarea, button",
    offset = 8,            
    step = 0.09,           
    className = "",
    threshold = 0.3,        
}) {
    const [scope, animate] = useAnimate();
    const inView = useInView(scope, { amount: threshold });

    useEffect(() => {
        const target = Array.isArray(selectors) ? selectors.join(", ") : selectors;

        if (inView) {
            animate(
                target,
                { opacity: 1, y: 0 },
                { duration: 0.45, ease: "easeOut", delay: stagger(step) }
            );
        } else {
            // reset so it can play again next time
            animate(target, { opacity: 0, y: offset }, { duration: 0.001 });
        }
    }, [inView, animate, selectors, step, offset]);

    return (
        <div ref={scope} className={`will-change-transform ${className}`}>
            {children}
        </div>
    );
}
