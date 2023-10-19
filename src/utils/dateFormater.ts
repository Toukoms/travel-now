export function getDateString(date: Date, separator: string = "-") {
  // Get the year, month and day
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
  const day = date.getDate().toString().padStart(2, "0");

  // Construct the date string
  return `${year}${separator}${month}${separator}${day}`;
}

export function getTimeString(date: Date, separator: string = ":") {
  // Get the hours and minutes
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Construct the time string
  return `${hours}${separator}${minutes}`;
}
