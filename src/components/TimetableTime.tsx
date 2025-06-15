import React from "react";
import Box from "./Box";
import Typography, { TypographyRole } from "./Typography";

interface TimetableTimeProps {
  time: string;
  className: string;
  typographyRole?: TypographyRole;
}
const TimetableTime = ({
  time,
  className,
  typographyRole,
}: TimetableTimeProps) => {
  return (
    <Box
      colsXs={1}
      colsSm={1}
      colsMd={1}
      colsLg={1}
      className={`text-center content-center h-[32px] ${className}`}
    >
      <Typography role={typographyRole}>{time}</Typography>
    </Box>
  );
};

export default TimetableTime;
