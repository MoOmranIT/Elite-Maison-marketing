import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

function hasCssScrollTimeline() {
  try {
    return typeof CSS !== "undefined" && (
      CSS.supports("animation-timeline: scroll()")
      || CSS.supports("animation-timeline", "scroll()")
    );
  } catch {
    return false;
  }
}

export function Skyfield() {
  const reduce = useReducedMotion() === true;
  const [cssDriven] = useState(hasCssScrollTimeline);
  const useMotion = !reduce && !cssDriven;

  const { scrollYProgress } = useScroll();
  const yFar = useTransform(scrollYProgress, [0, 1], ["0vh", "-8vh"]);
  const yMid = useTransform(scrollYProgress, [0, 1], ["0vh", "-18vh"]);
  const yNear = useTransform(scrollYProgress, [0, 1], ["0vh", "-28vh"]);
  const nearOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.2]);

  return (
    <div className="skyfield" aria-hidden="true">
      <motion.div
        className="skyfield__layer skyfield__wash"
        style={useMotion ? { y: yFar } : undefined}
      />
      <motion.div
        className="skyfield__layer skyfield__bloom"
        style={useMotion ? { y: yMid } : undefined}
      />
      <motion.div
        className="skyfield__layer skyfield__arch"
        style={useMotion ? { y: yNear, opacity: nearOpacity } : undefined}
      >
        <i className="skyfield__arch-live" />
      </motion.div>
    </div>
  );
}
