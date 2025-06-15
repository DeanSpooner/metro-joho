import React from "react";
import Box from "./Box";
import Typography from "./Typography";
import Grid from "./Grid";

interface TimetableProps {
  times: string[];
}

const Timetable = ({ times }: TimetableProps) => {
  return (
    <Grid className="px-[0]">
      {times.map(time => (
        <Box
          colsXs={1}
          colsSm={1}
          colsMd={1}
          colsLg={1}
          key={time}
          className="text-center bg-teal-900"
        >
          <Typography>{time}</Typography>
        </Box>
      ))}
    </Grid>
  );
};

export default Timetable;
