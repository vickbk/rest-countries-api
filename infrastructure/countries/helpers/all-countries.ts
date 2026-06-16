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

  const iMeta = independant.meta;
  const dMeta = dependant.meta;
  const results = {
    error: independant.error || dependant.error,
    success: independant.success || dependant.success,
    countries: [
      ...(independant.countries || []),
      ...(dependant.countries || []),
    ],
    meta: {
      count: (iMeta?.count ?? 0) + (dMeta?.count ?? 0),
      total: (iMeta?.total ?? 0) + (dMeta?.total ?? 0),
      limit: (iMeta?.limit ?? 0) + (dMeta?.limit ?? 0),
    },
  };

  return results.countries;
}
