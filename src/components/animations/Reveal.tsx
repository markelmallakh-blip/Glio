"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  /** Vertical offset in px the content travels while fading in. */
  offset?: number;
};

/** Fades and lifts content into view once. Static when motion is reduced. */
export function Reveal({ children, delay = 0, offset = 28, ...props }: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <motion.div {...props}>{children}</motion.div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
