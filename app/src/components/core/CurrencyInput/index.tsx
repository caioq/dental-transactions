import MaskedInput from "react-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export function CurrencyInput({ ...children }) {
  const currencyMask = createNumberMask({
    prefix: "R$ ",
    thousandsSeparatorSymbol: ".",
    decimalSymbol: ",",
    allowDecimal: true,
  });

  return <MaskedInput mask={currencyMask} inputMode="numeric" {...children} />;
}
