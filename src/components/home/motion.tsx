import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, type TargetAndTransition } from "motion/react";

/** Shared easing across the home sections — matches --ease in site.css. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Fade + rise on first entry into the viewport.
 * With `prefers-reduced-motion` the content is simply present.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  once = true
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion() === true;
  const initial: TargetAndTransition | boolean = reduce ? { opacity: 1, y: 0 } : { opacity: 0, y };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered list wrapper — children must be <Reveal> elements with their own delay. */
export function RevealGroup({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

/**
 * Counts a leading integer up when the element scrolls into view, keeping any
 * suffix ("65K" -> 65K). Latin numerals, so the span stays LTR inside RTL copy.
 */
export function CountUp({ value, duration = 1500 }: { value: string; duration?: number }) {
  const reduce = useReducedMotion() === true;
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (reduce || !match) {
      setDisplay(value);
      return;
    }
    const target = Number(match[1]);
    const suffix = match[2];
    const el = ref.current;
    if (!el) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, reduce]);

  return (
    <span ref={ref} dir="ltr">
      {display}
    </span>
  );
}

/**
 * A gold hairline that scales in from the inline start edge, so it reads
 * correctly in both RTL and LTR.
 */
export function DrawRule({ className, delay = 0, long = false }: { className?: string; delay?: number; long?: boolean }) {
  const reduce = useReducedMotion() === true;
  return (
    <motion.span
      className={`hv-rule${long ? " hv-rule--long" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    />
  );
}

/**
 * Scroll progress (0 → 1) across a section, spring-smoothed.
 * Used to fill the delivery-path rail as the reader moves through it.
 */
export function useRailProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.65"]
  });
  return useSpring(scrollYProgress, { stiffness: 110, damping: 28, restDelta: 0.001 });
}

/**
 * Index-based selection shared by the diagnosis, Four I's and engagement
 * sections: keyboard navigable, one panel visible, no router state churn.
 */
export function useSelection(count: number, initial = 0) {
  const [index, setIndex] = useState(Math.min(Math.max(initial, 0), Math.max(count - 1, 0)));
  const move = (delta: number) =>
    setIndex((current) => {
      const next = current + delta;
      if (next < 0) return count - 1;
      if (next > count - 1) return 0;
      return next;
    });
  return { index, setIndex, move } as const;
}
