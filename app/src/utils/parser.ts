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

export const parseFloatToString = (value: number): string => {
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
