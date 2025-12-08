export const currencyFormatter = ({
  lang = "en-US",
  amount,
  currency = "USD",
}: {
  lang?: string;
  amount: number;
  currency?: string;
}) => {
  const formatter = new Intl.NumberFormat(lang, {
    style: "currency",
    currency,
  });
  return formatter.format(amount);
};

export const currencyToNumber = ({
  amount,
  decimalSymbol = ".",
}: {
  amount: string;
  decimalSymbol?: "." | ",";
}) => +amount.replace(new RegExp("[^\\d" + decimalSymbol + "]", "g"), "");

export const readableNumber = (number: number) => {
  const formatter = new Intl.NumberFormat();
  return formatter.format(number);
};
