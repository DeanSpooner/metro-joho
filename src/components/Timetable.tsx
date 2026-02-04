"use client";

import React from "react";
import TimetableTime from "./TimetableTime";

interface TimetableProps {
  times: string[];
}

const Timetable = ({ times }: TimetableProps) => {
  const [, setTick] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let currentTimetableBox = 1;

  const getTimetableTimeBox = (timetableTime: string) => {
    const [hour, minute] = timetableTime.split(":").map(Number);
    const now = new Date();
    const jstNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
    );
    jstNow.setSeconds(0, 0);

    const timetableDate = new Date(jstNow);
    timetableDate.setHours(hour, minute, 0, 0);

    if (timetableDate < jstNow) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-white/5 opacity-30 cursor-not-allowed border border-transparent"
        />
      );
    }

    const priorityTimes = currentTimetableBox++;
    if (priorityTimes === 1) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-white text-[#02022a] font-bold border border-white shadow-lg animate-pulse"
          typographyRole="strong"
        />
      );
    } else if (priorityTimes <= 3) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-white/20 border border-white/30 text-white"
          typographyRole="strong"
        />
      );
    } else {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 transition-colors"
          typographyRole="strong"
        />
      );
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12 gap-2 px-2 py-4">
      {times.map((time) => getTimetableTimeBox(time))}
    </div>
  );
};

export default Timetable;
