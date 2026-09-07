import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";

export type DisclosureItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconName: string;
};

type FloatingDisclosureProps = {
  items: DisclosureItem[];
  label: string;
  closeLabel: string;
  panelLabel: string;
  logoSrc: string;
};

const SPRING = { type: "spring" as const, stiffness: 280, damping: 26 };
const PANEL_ID = "contact-dock-panel";

function useOffsetSize(tick: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const width = el.offsetWidth;
      const height = el.offsetHeight;
      setBounds((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tick]);

  return [ref, bounds] as const;
}

export function FloatingDisclosure({
  items,
  label,
  closeLabel,
  panelLabel,
  logoSrc
}: FloatingDisclosureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, bounds] = useOffsetSize(isOpen);
  const reduce = useReducedMotion() === true;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const hadOpen = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      hadOpen.current = true;
      closeRef.current?.focus();
      return;
    }
    if (hadOpen.current) triggerRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const nodes = [".skip-link", ".topbar", ".page", ".footer"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (isOpen) nodes.forEach((el) => el.setAttribute("inert", ""));
    else nodes.forEach((el) => el.removeAttribute("inert"));
    return () => nodes.forEach((el) => el.removeAttribute("inert"));
  }, [isOpen]);

  const instant = reduce ? { duration: 0 } : SPRING;
  const blurIn = reduce ? "blur(0px)" : "blur(8px)";
  const blurItem = reduce ? "blur(0px)" : "blur(4px)";

  return (
    <MotionConfig transition={instant}>
      {isOpen ? (
        <div className="contact-dock__scrim" aria-hidden="true" onClick={() => setIsOpen(false)} />
      ) : null}
      <div className="contact-dock">
        <AnimatePresence>
          {isOpen ? (
            <motion.button
              key="close-chip"
              type="button"
              ref={closeRef}
              className="contact-dock__chip"
              aria-label={closeLabel}
              aria-expanded="true"
              aria-controls={PANEL_ID}
              initial={{ opacity: 0, filter: blurIn, y: 0, x: "-50%" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                y: reduce ? -72 : -148,
                x: "-50%",
                pointerEvents: "auto"
              }}
              exit={{ opacity: 0, filter: blurIn, y: 0 }}
              transition={reduce ? { duration: 0 } : { type: "spring", delay: 0.05, duration: 0.6, bounce: 0.3 }}
              onClick={() => setIsOpen(false)}
            >
              <Icon name="plus" className="icon contact-dock__plus is-open" />
            </motion.button>
          ) : null}
        </AnimatePresence>
        <motion.div
          className={cn("contact-dock__shell", isOpen && "is-open")}
          animate={{
            width: bounds.width > 0 ? bounds.width : "auto",
            height: bounds.height > 0 ? bounds.height : "auto"
          }}
        >
          <div ref={ref} className="contact-dock__measure">
            <AnimatePresence mode="popLayout" initial={false}>
              {!isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
                >
                  <button
                    type="button"
                    ref={triggerRef}
                    className="contact-dock__trigger"
                    aria-expanded={false}
                    aria-controls={PANEL_ID}
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="contact-dock__mark">
                      <img src={logoSrc} alt="" width={52} height={52} />
                    </span>
                    <span className="contact-dock__caption">{label}</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  id={PANEL_ID}
                  role="region"
                  aria-label={panelLabel}
                  className="contact-dock__list"
                >
                  {items.map((item) => {
                    const remote = item.href.startsWith("http");
                    return (
                      <motion.a
                        key={item.id}
                        href={item.href}
                        className="contact-dock__item"
                        target={remote ? "_blank" : undefined}
                        rel={remote ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, filter: blurItem, y: reduce ? 0 : 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        exit={{
                          opacity: 0,
                          filter: blurItem,
                          transition: { duration: reduce ? 0 : 0.2, ease: "easeOut" }
                        }}
                        transition={reduce ? { duration: 0 } : { delay: 0.15, type: "spring", stiffness: 200, damping: 20 }}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="icon-well icon-well--sm">
                          <Icon name={item.iconName} />
                        </span>
                        <span className="contact-dock__copy">
                          <strong>{item.title}</strong>
                          <span>{item.description}</span>
                        </span>
                      </motion.a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
