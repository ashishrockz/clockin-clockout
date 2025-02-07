export const getFormattedTime = (date: Date) => {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }).toLowerCase();
};

export const getFormattedDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
