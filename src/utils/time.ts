export const getCurrentJapanTime = (): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Tokyo",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Intl.DateTimeFormat("en-GB", options).format(new Date());
};
