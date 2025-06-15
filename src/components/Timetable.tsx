import React from "react";
import Grid from "./Grid";
import Clock from "./Clock";
import TimetableTime from "./TimetableTime";

interface TimetableProps {
  times: string[];
}

const Timetable = ({ times }: TimetableProps) => {
  let currentTimetableBox = 1;

  const getTimetableTimeBox = (timetableTime: string) => {
    const [hour, minute] = timetableTime.split(":").map(Number);
    const now = new Date();
    const jstNow = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" })
    );

    const timetableDate = new Date(jstNow);
    timetableDate.setHours(hour, minute, 0, 0);

    if (timetableDate < jstNow) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-red-800"
        />
      );
    }

    const priorityTimes = currentTimetableBox++;
    if (priorityTimes === 1) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-teal-500 animate-[bgpulse_2s_ease-in-out_infinite]"
          typographyRole="strong"
        />
      );
    } else if (priorityTimes === 2) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-teal-700"
          typographyRole="strong"
        />
      );
    } else if (priorityTimes === 3) {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-teal-800"
          typographyRole="strong"
        />
      );
    } else {
      return (
        <TimetableTime
          key={timetableTime}
          time={timetableTime}
          className="bg-teal-900"
          typographyRole="strong"
        />
      );
    }
  };

  return (
    <Grid className="px-[0] py-[16px]">
      <Clock />
      {times.map(time => getTimetableTimeBox(time))}
    </Grid>
  );
};

export default Timetable;
