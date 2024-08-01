export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const padZero = (num: Number) => num.toString().padStart(2, '0');
  
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-indexed
  const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
  
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = daysOfWeek[date.getDay()];

  return `${month}/${day}/${year}(${dayOfWeek})${hours}:${minutes}:${seconds}`;
}