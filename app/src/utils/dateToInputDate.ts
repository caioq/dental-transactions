export function dateToInputDate(date?: Date) {
  if (!date || !!isNaN(date.getTime())) {
    return new Date().toJSON().slice(0, 10) as unknown as Date;
  }
  return date.toJSON().slice(0, 10) as unknown as Date;
}
