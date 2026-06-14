import { Country } from "@yusifaliyevpro/countries";
import { params, restCountries } from "../client";

export async function getAllCountries({
  q,
  page = 0,
  ...options
}: {
  q?: string;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
  page?: number;
}) {
  q = q || undefined;
  const limit = 12;
  const offset = limit * page;
  const [independant, dependant] = await Promise.all([
    restCountries.getCountries({
      ...params,
      limit,
      ...options,
      offset,
      q,
    }),
    restCountries.getCountries({
      ...params,
      limit,
      offset,
      filters: {
        classification: {
          dependency: true,
        },
      },
      q,
      ...options,
    }),
  ]);

  return [...(independant.countries || []), ...(dependant.countries || [])];
}
