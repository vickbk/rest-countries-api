import { Country } from "@yusifaliyevpro/countries";
import { params, restCountries } from "../client";

export async function getAllCountries({
  q,
  ...options
}: {
  q?: string;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
}) {
  q = q || undefined;
  const [independant, dependant] = await Promise.all([
    restCountries.getCountries({
      ...params,
      limit: 12,
      ...options,
      q,
    }),
    restCountries.getCountries({
      ...params,
      limit: 12,
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
