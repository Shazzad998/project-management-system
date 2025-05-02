
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";

type RevealProps = {
    children:ReactNode, 
    delay:number|null, 
    className?:string, 
    x?:number, 
    y?:number
}
const Reveal = ({ children, delay, className, x = -50, y = 0 }:RevealProps) =>  {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={className}
        variants={{
          hidden: {
            opacity: 0,
            x: x,
            y: y,
          },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
          },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration: 0.5,
          delay: delay ?? 0,
        }}
        exit="hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Reveal;