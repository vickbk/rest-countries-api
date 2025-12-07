import { Country } from "./country";

export const CountriesList = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return Array(12)
    .fill(null)
    .map((_, key) => <Country key={key} />);
};
