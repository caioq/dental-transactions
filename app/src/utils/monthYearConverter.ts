export function getMonthYearStringFromDate(date: Date): { month: string; year: string; monthYear: string } {
  const dateObj = new Date(date);
  const year = dateObj.toLocaleDateString(undefined, { year: "numeric" });
  const month = dateObj.toLocaleDateString(undefined, { month: "long" });
  const formattedMonth = month.charAt(0).toLocaleUpperCase() + month.slice(1);
  return { year, month: formattedMonth, monthYear: `${formattedMonth} ${year}` };
}
