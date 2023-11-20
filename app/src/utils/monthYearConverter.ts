export function getMonthYearStringFromDate(date: Date): { month: string; year: string } {
  const dateObj = new Date(date);
  const year = dateObj.toLocaleDateString(undefined, { year: "numeric" });
  const month = dateObj.toLocaleDateString(undefined, { month: "long" });
  const formattedMonth = month.charAt(0).toLocaleUpperCase() + month.slice(1);
  return { year, month: formattedMonth };
}

// Month Year: November 2023
export function getDateFromMonthYear(monthYear: string): Date {
  const [month, year] = monthYear.split(" ");
  return new Date(Number(year), monthMapper[month], 1);
}

const monthMapper: { [key: string]: number } = {
  Janeiro: 0,
  Fevereiro: 1,
  Março: 2,
  Abril: 3,
  Maio: 4,
  Junho: 5,
  Julho: 6,
  Agosto: 7,
  Setembro: 8,
  Outubro: 9,
  Novembro: 10,
  Dezembro: 11,
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};
