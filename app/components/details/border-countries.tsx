import { loadCountriesByTag } from "@/app/lib/countries";
import Link from "next/link";

export const BorderCountries = async ({
  borders = [],
}: {
  borders?: string[];
}) => {
  const borderCountries = (await loadCountriesByTag({ codes: borders })) || [];

  return (
    <article className="sm:col-span-full sm:flex gap-4 sm:items-center">
      <h3>Border Countries:</h3>
      <ul className="flex flex-wrap gap-4 mt-6 sm:mt-0">
        {borderCountries.map(({ name: { common } }) => (
          <li key={common}>
            <Link
              className="p-2 px-6 outstand outstand-button block rounded shadow-2xl"
              href={`/${common}`}
            >
              {common}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};
