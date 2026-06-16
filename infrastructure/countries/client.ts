import { defineFields, RestCountries } from "@yusifaliyevpro/countries";

export const restCountries = new RestCountries({
  apiKey: process.env.RESTCOUNTRIES_API_KEY!,
});

export const fields = defineFields([
  "names",
  "population",
  "flag",
  "capitals",
  "region",
]);
export const params = { independant: true, fields };
