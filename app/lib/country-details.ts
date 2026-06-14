import { CountryType } from "./countries";
import { readableNumber } from "./number-converter";

export type CountryDetailsType = CountryType<
  [
    "names",
    "flag",
    "capitals",
    "population",
    "region",
    "borders",
    "subregion",
    "tlds",
    "currencies",
    "languages",
  ]
>;

export const getCountryDetails = ({
  country,
}: {
  country: CountryDetailsType;
}) => {
  const {
    names,
    population,
    region,
    subregion,
    capitals,
    tlds,
    currencies,
    languages,
  } = country;

  const primaryDetails = convertToNameValue({
    data: [
      ["Native Name", Object.values(names.native || {})[0]?.common || ""],
      ["population", readableNumber(population)],
      ["region", region],
      ["Sub Region", subregion as string],
      ["capital", capitals.map((c) => c.name).join(", ") || ""],
    ],
  });

  const moreDetails = convertToNameValue({
    data: [
      ["Top Level Domain", tlds?.join(", ") || ""],
      [
        "Currencies",
        Object.values(currencies || {})
          .map(({ name }) => name)
          .join(", "),
      ],
      ["Languages", languages?.map((l) => l.name).join(", ")],
    ],
  });
  return { primaryDetails, moreDetails };
};

export const convertToNameValue = ({ data }: { data: [string, string][] }) => {
  return data.map(([name, value]) => ({ name, value }));
};
