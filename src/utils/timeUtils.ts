"use client";

// Gets the last missed departure and the next 3 departures
export const getUpcomingDepartures = (allTimes: string[]): { missed: string | null; upcoming: string[] } => {
  if (!allTimes || allTimes.length === 0) return { missed: null, upcoming: [] };

  const sortedTimes = [...allTimes].sort();
  const now = new Date();
  
  // Create a proper date object for each time to compare
  // Using current date but parsing time string "HH:MM"
  const getDepartureDate = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Find index of first upcoming departure
  // Note: This simplistic comparison assumes all times are for "today"
  // ODPT data might include times like "24:30" which need special handling if we want to be perfect,
  // but simpler logic works for standard "HH:MM" within same day usually.
  const upcomingIndex = sortedTimes.findIndex(time => {
    const departureDate = getDepartureDate(time);
    return departureDate > now;
  });

  if (upcomingIndex === -1) {
    // No more trains today
    return { 
      missed: sortedTimes[sortedTimes.length - 1] || null, 
      upcoming: [] 
    };
  }

  const missed = upcomingIndex > 0 ? sortedTimes[upcomingIndex - 1] : null;
  const upcoming = sortedTimes.slice(upcomingIndex, upcomingIndex + 3);

  return { missed, upcoming };
};
