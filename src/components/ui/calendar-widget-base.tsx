"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarDays } from "lucide-react";
import type { CalendarEvent, EventsData, CalendarWidgetProps } from "@/components/ui/calendar-widget";

export type { CalendarEvent, EventsData, CalendarWidgetProps };

const daysOfWeek: string[] = ["S", "M", "T", "W", "T", "F", "S"];

export const CalendarWidgetBase: FC<CalendarWidgetProps> = ({
  events,
  initialSelectedDate,
  currentMonthYear,
  onDateChange
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(initialSelectedDate);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - el.offsetLeft;
      scrollLeftStart.current = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMouseLeave = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };
    const onMouseUp = () => {
      isDragging.current = false;
      el.style.cursor = "grab";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      el.scrollLeft = scrollLeftStart.current - (e.pageX - el.offsetLeft - startX.current);
    };
    el.style.cursor = "grab";
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const origin = new Date(`${initialSelectedDate}T12:00:00`);
  const dates = Array.from({ length: 92 }, (_, i) => {
    const date = new Date(origin);
    date.setDate(origin.getDate() + i);
    return {
      day: date.getDate(),
      fullDate: date.toISOString().split("T")[0],
      dayName: daysOfWeek[date.getDay()]
    };
  });

  return (
    <div className="theme-injected border-border bg-muted flex w-[340px] max-w-full flex-col rounded-lg border shadow-lg transition-colors duration-500 select-none">
      <div className="p-4">
        <motion.div key={currentMonthYear} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-foreground ml-2 text-xl font-semibold">
          {currentMonthYear}
        </motion.div>
        <div className="relative">
          <div ref={scrollRef} className="scrollbar-hide flex gap-2 overflow-x-auto px-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {dates.map((date) => {
              const isSelected = selectedDate === date.fullDate;
              const hasEvent = events[date.fullDate]?.length > 0;
              return (
                <div key={date.fullDate} className="relative flex min-w-10 flex-col items-center pt-4">
                  <div className={`mb-1 text-base font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>{date.dayName}</div>
                  <button type="button" aria-pressed={isSelected} className="relative flex h-10 w-10 items-center justify-center" onClick={() => { setSelectedDate(date.fullDate); onDateChange?.(date.fullDate); }}>
                    {isSelected && <motion.div layoutId="selected-date-bg-base" className="bg-background absolute inset-0 rounded-lg shadow-sm" />}
                    <span className="relative z-10 text-base font-medium">{date.day}</span>
                  </button>
                  <AnimatePresence mode="popLayout" initial={false}>
                    {hasEvent && !isSelected && (
                      <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className="bg-muted-foreground h-1.5 w-1.5 rounded-full" />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="border-border bg-card relative flex h-52 flex-col overflow-hidden rounded-lg border px-4 pt-2">
        <div className="relative h-full overflow-y-auto">
          {events[selectedDate]?.length ? (
            events[selectedDate].map((event) => (
              <div key={event.title} className="border-border flex flex-col border-b py-2 last:border-b-0">
                <span className="text-foreground/70 text-base font-medium">{event.title}</span>
                <span className="text-muted-foreground text-base">{event.time}</span>
              </div>
            ))
          ) : (
            <div className="flex h-40 flex-col items-center justify-center gap-3">
              <div className="bg-muted rounded-lg p-5">
                <CalendarDays className="text-muted-foreground size-8" />
              </div>
              <p className="text-muted-foreground text-sm">No Events</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
