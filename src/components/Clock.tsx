"use client";

import { getCurrentJapanTime } from "@/utils/time";
import React, { useEffect, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(getCurrentJapanTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentJapanTime());
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <Box>
      <Typography role="h4">
        The current time in Japan is {currentTime}
      </Typography>
    </Box>
  );
};

export default Clock;
