import { Country, CountryListResult } from "@yusifaliyevpro/countries";
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
      count: addMeta(iMeta?.count, dMeta?.count),
      total: addMeta(iMeta?.total, dMeta?.total),
      limit: addMeta(iMeta?.limit, dMeta?.limit),
      duration: addMeta(iMeta?.duration, dMeta?.duration),
      more: iMeta?.more || dMeta?.more,
      request_id: iMeta?.request_id ?? dMeta?.request_id,
    },
  } as CountryListResult<
    readonly ["names", "population", "flag", "capitals", "region"]
  >;
  return results;
}

function addMeta(first = 0, second = 0) {
  return first + second;
}
