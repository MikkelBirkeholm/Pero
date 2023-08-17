export default function generateWeekDates(currentDate) {
  const weekDates = [];
  const today = new Date(currentDate);
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Find the first day of the week (Monday)

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(startOfWeek);
    nextDate.setDate(startOfWeek.getDate() + i);
    weekDates.push(nextDate.toISOString().slice(0, 10)); // Convert to 'YYYY-MM-DD' format and add to the array
  }

  return weekDates;
}
