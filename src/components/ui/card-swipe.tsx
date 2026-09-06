import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
  type Transition
} from "motion/react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { toRoute } from "@/lib/routes";

export type SwipeItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
  kicker?: string;
};

type CardSwipeProps = {
  items: SwipeItem[];
  index: number;
  onIndexChange: (index: number) => void;
  ctaLabel: string;
  ctaHref: string;
  rtl?: boolean;
  dotsLabel: string;
};

const GAP = 16;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const SPRING: Transition = { type: "spring", stiffness: 330, damping: 30 };

export function CardSwipe({
  items,
  index,
  onIndexChange,
  ctaLabel,
  ctaHref,
  rtl = false,
  dotsLabel
}: CardSwipeProps) {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(360);
  const x = useMotionValue(0);
  const step = width + GAP;
  const current = Math.min(Math.max(index, 0), Math.max(items.length - 1, 0));
  const targetX = -current * step;
  const height = 420;

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(280, Math.floor(el.clientWidth)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function handleDragEnd(_: unknown, info: PanInfo) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      onIndexChange(Math.min(current + 1, items.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      onIndexChange(Math.max(current - 1, 0));
    }
  }

  const left = -step * Math.max(items.length - 1, 0);

  if (!items.length) return null;

  return (
    <div className="swipe" ref={host}>
      <div
        className="swipe__stage"
        dir="ltr"
        style={{ height }}
        role="region"
        aria-roledescription="carousel"
        aria-live="polite"
      >
        <motion.div
          className="swipe__track"
          drag={reduce ? false : "x"}
          dragConstraints={{ left, right: 0 }}
          style={{ gap: GAP, x }}
          onDragEnd={handleDragEnd}
          animate={{ x: targetX }}
          transition={reduce ? { duration: 0 } : SPRING}
        >
          {items.map((item, i) => (
            <article
              key={item.id}
              className={cn("swipe-card", i === current && "is-active")}
              dir={rtl ? "rtl" : "ltr"}
              style={{ width, minHeight: height, zIndex: i === current ? 2 : 1 }}
            >
              <span className="icon-well">
                <Icon name={item.iconName} rtl={rtl} />
              </span>
              {item.kicker ? <p className="kicker">{item.kicker}</p> : null}
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <Link className="btn btn--gold" to={toRoute(ctaHref)}>
                {ctaLabel} <Icon name="arrow" rtl={rtl} />
              </Link>
            </article>
          ))}
        </motion.div>
      </div>
      <div className="swipe__dots" role="tablist" aria-label={dotsLabel}>
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={current === i}
            aria-label={item.title}
            className={cn("swipe__dot", current === i && "is-active")}
            onClick={() => onIndexChange(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default CardSwipe;
