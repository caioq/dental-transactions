export const parseCurrencyToFloat = (value: string): number | null => {
  const numericString = value.replace(/[^\d,]/g, "");

  const dotSeparatedString = numericString.replace(",", ".");

  const floatValue = parseFloat(dotSeparatedString);

  if (isNaN(floatValue)) {
    console.error("Invalid currency format");
    return null;
  }

  return floatValue;
};

export const parseFloatToString = (value: number): string | null => {
  if (!value) return null;

  let stringValue: string;
  const regex = /^\d+(\.\d{2})?$/;
  if (!regex.test(value.toString())) {
    stringValue = value.toFixed(2);
  } else {
    stringValue = value.toString();
  }

  const currencyString = stringValue.replace(".", ",");

  return `R$ ${currencyString}`;
};

export const parseDatetoISODate = (date: Date): string => date.toISOString().substring(0, 10);
