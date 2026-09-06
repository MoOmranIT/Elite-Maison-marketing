import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export interface CalendarEvent {
  title: string;
  time: string;
}

export interface EventsData {
  [key: string]: CalendarEvent[];
}

export interface CalendarWidgetProps {
  events: EventsData;
  initialSelectedDate: string;
  currentMonthYear?: string;
  onDateChange?: (date: string) => void;
  onSelectionChange?: (next: { date: string; slot: CalendarEvent | null }) => void;
  emptyLabel?: string;
  daysOfWeek?: string[];
  rangeStart?: string;
  dayCount?: number;
  locale?: string;
  windowsLabel?: string;
  dayOnlyLabel?: string;
  windowMarkLabel?: string;
}

function iso(date: Date) {
  return date.toISOString().split("T")[0];
}

function weekday(date: Date, locale: string, fallback?: string[]) {
  if (fallback?.length) return fallback[date.getDay()] || fallback[0];
  return new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    weekday: locale === "ar" ? "narrow" : "short"
  }).format(date);
}

function slotKey(slot: CalendarEvent | null) {
  return slot ? `${slot.title}|${slot.time}` : "";
}

export function CalendarWidget({
  events,
  initialSelectedDate,
  currentMonthYear,
  onDateChange,
  onSelectionChange,
  emptyLabel = "No Events",
  daysOfWeek,
  rangeStart,
  dayCount = 18,
  locale = "en",
  windowsLabel,
  dayOnlyLabel,
  windowMarkLabel
}: CalendarWidgetProps) {
  const origin = new Date(`${rangeStart || initialSelectedDate}T12:00:00`);
  const dates = Array.from({ length: dayCount }, (_, i) => {
    const date = new Date(origin);
    date.setDate(origin.getDate() + i);
    return {
      fullDate: iso(date),
      day: date.getDate(),
      label: weekday(date, locale, daysOfWeek),
      date
    };
  });

  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const firstWindow = events[initialSelectedDate]?.[0] ?? null;
  const [selectedSlot, setSelectedSlot] = useState<CalendarEvent | null>(firstWindow);
  const stripRef = useRef<HTMLDivElement>(null);
  const groupId = useId();
  const month = currentMonthYear || new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    month: "long",
    year: "numeric"
  }).format(origin);

  useEffect(() => {
    setSelectedDate(initialSelectedDate);
    const next = events[initialSelectedDate]?.[0] ?? null;
    setSelectedSlot(next);
  }, [initialSelectedDate, events]);

  function emit(date: string, slot: CalendarEvent | null) {
    onDateChange?.(date);
    onSelectionChange?.({ date, slot });
  }

  function pickDate(fullDate: string) {
    const next = events[fullDate]?.[0] ?? null;
    setSelectedDate(fullDate);
    setSelectedSlot(next);
    emit(fullDate, next);
  }

  useEffect(() => {
    emit(selectedDate, selectedSlot);
    // Announce the default window once the chamber mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount only
  }, []);

  function pickSlot(slot: CalendarEvent | null) {
    setSelectedSlot(slot);
    emit(selectedDate, slot);
  }

  function onDateKey(e: KeyboardEvent<HTMLDivElement>) {
    const rtl = document.documentElement.dir === "rtl";
    const index = dates.findIndex((d) => d.fullDate === selectedDate);
    let next = index;
    if (e.key === "ArrowRight") next = index + (rtl ? -1 : 1);
    else if (e.key === "ArrowLeft") next = index + (rtl ? 1 : -1);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = dates.length - 1;
    else return;
    e.preventDefault();
    const item = dates[Math.max(0, Math.min(dates.length - 1, next))];
    if (!item) return;
    pickDate(item.fullDate);
    requestAnimationFrame(() => {
      stripRef.current?.querySelector<HTMLButtonElement>(`[data-date="${item.fullDate}"]`)?.focus();
    });
  }

  const windows = events[selectedDate] || [];

  return (
    <div className="book-widget">
      <p className="book__month">{month}</p>
      <div
        ref={stripRef}
        className="book__strip"
        role="radiogroup"
        aria-label={month}
        onKeyDown={onDateKey}
      >
        {dates.map((date) => {
          const checked = selectedDate === date.fullDate;
          const hasWindow = Boolean(events[date.fullDate]?.length);
          const name = hasWindow && windowMarkLabel
            ? `${date.label} ${date.day}. ${windowMarkLabel}`
            : `${date.label} ${date.day}`;
          return (
            <button
              key={date.fullDate}
              type="button"
              className="book__day"
              role="radio"
              data-date={date.fullDate}
              data-has-window={hasWindow ? "true" : undefined}
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              aria-label={name}
              onClick={() => pickDate(date.fullDate)}
            >
              <span className="book__dow">{date.label}</span>
              <span className="book__num">{date.day}</span>
            </button>
          );
        })}
      </div>

      <div className="book__windows">
        {windowsLabel ? <p className="book__windows-label">{windowsLabel}</p> : null}
        {windows.length ? (
          <div role="radiogroup" aria-label={windowsLabel || "Windows"} className="book__slots">
            {windows.map((event) => {
              const id = `${groupId}-${slotKey(event)}`;
              const checked = slotKey(selectedSlot) === slotKey(event);
              return (
                <label key={id} className="book__slot" htmlFor={id}>
                  <input
                    id={id}
                    type="radio"
                    name={`${groupId}-window`}
                    checked={checked}
                    onChange={() => pickSlot(event)}
                  />
                  <span className="book__slot-title">{event.title}</span>
                  <span className="book__slot-time">{event.time}</span>
                </label>
              );
            })}
            {dayOnlyLabel ? (
              <label className="book__slot book__slot--quiet" htmlFor={`${groupId}-none`}>
                <input
                  id={`${groupId}-none`}
                  type="radio"
                  name={`${groupId}-window`}
                  checked={!selectedSlot}
                  onChange={() => pickSlot(null)}
                />
                <span className="book__slot-title">{dayOnlyLabel}</span>
              </label>
            ) : null}
          </div>
        ) : (
          <p className="book__empty">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}
