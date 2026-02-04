"use client";

export const getUpcomingDepartures = (allTimes: string[]): { missed: string | null; upcoming: string[] } => {
  if (!allTimes || allTimes.length === 0) return { missed: null, upcoming: [] };

  const sortedTimes = [...allTimes].sort();
  
  const now = new Date();
  const jstDateString = now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" });
  const jstDate = new Date(jstDateString);
  
  const getMinutes = (d: Date) => d.getHours() * 60 + d.getMinutes();
  const getMinutesFromStr = (timeStr: string) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  };

  const currentMinutes = getMinutes(jstDate);

  const upcomingIndex = sortedTimes.findIndex(time => {
    return getMinutesFromStr(time) >= currentMinutes;
  });

  if (upcomingIndex === -1) {
    return { 
      missed: sortedTimes[sortedTimes.length - 1] || null, 
      upcoming: [] 
    };
  }

  const missed = upcomingIndex > 0 ? sortedTimes[upcomingIndex - 1] : null;
  const upcoming = sortedTimes.slice(upcomingIndex, upcomingIndex + 3);

  return { missed, upcoming };
};
