"use client";

import { interpolate } from "@/utils/utilities";
import { getCurrentJapanTime } from "@/utils/time";
import React, { useEffect, useState } from "react";
import Box from "./Box";
import Typography from "./Typography";

const Clock = ({ label }: { label: string }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentJapanTime());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentJapanTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Typography role="h4">
        {interpolate(label, { time: currentTime })}
      </Typography>
    </Box>
  );
};

export default Clock;
