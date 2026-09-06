import { CalendarWidget } from "@/components/ui/calendar-widget";

const events = {
  "2026-09-07": [
    { title: "Diagnostic session", time: "10:00 – 11:00" },
    { title: "Follow-up conversation", time: "14:00 – 14:45" }
  ],
  "2026-09-09": [
    { title: "Initial inquiry", time: "09:30 – 10:00" },
    { title: "Growth review", time: "16:00 – 17:00" }
  ],
  "2026-09-14": [
    { title: "Strategy workshop", time: "11:00 – 12:30" }
  ]
};

function CalendarWidgetDemo() {
  return (
    <CalendarWidget
      events={events}
      rangeStart="2026-09-06"
      initialSelectedDate="2026-09-07"
      locale="en"
      windowsLabel="Suggested window"
      dayOnlyLabel="This day, without a specific window"
    />
  );
}

export default CalendarWidgetDemo;
