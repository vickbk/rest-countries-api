import { CountryType } from "./countries";
import { readableNumber } from "./number-converter";

export type CountryDetailsType = CountryType<
  [
    "name",
    "flags",
    "capital",
    "population",
    "region",
    "borders",
    "subregion",
    "tld",
    "currencies",
    "languages"
  ]
>;

export const getCountryDetails = ({
  country,
}: {
  country: CountryDetailsType;
}) => {
  const {
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = country;

  const primaryDetails = convertToNameValue({
    data: [
      ["Native Name", Object.values(name.nativeName || {})[0]?.common || ""],
      ["population", readableNumber(population)],
      ["region", region],
      ["Sub Region", subregion || ""],
      ["capital", capital?.join(", ") || ""],
    ],
  });

  const moreDetails = convertToNameValue({
    data: [
      ["Top Level Domain", tld?.join(", ") || ""],
      [
        "Currencies",
        Object.values(currencies || {})
          .map(({ name }) => name)
          .join(", "),
      ],
      ["Languages", Object.values(languages || {}).join(", ")],
    ],
  });
  return { primaryDetails, moreDetails };
};

export const convertToNameValue = ({ data }: { data: [string, string][] }) => {
  return data.map(([name, value]) => ({ name, value }));
};
