import { Country } from "@yusifaliyevpro/countries";
import { params, restCountries } from "../client";

export async function getAllCountries(options: {
  q?: string;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
}) {
  const [independant, dependant] = await Promise.all([
    restCountries.getCountries({
      ...params,
      limit: 20,
      ...options,
    }),
    restCountries.getCountries({
      ...params,
      limit: 20,
      filters: {
        classification: {
          dependency: true,
        },
      },
      ...options,
    }),
  ]);
  return [...(independant.countries || []), ...(dependant.countries || [])];
}
