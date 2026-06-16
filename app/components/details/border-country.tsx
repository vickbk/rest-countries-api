import { loadCountriesByTag } from "@/app/lib/countries";
import Link from "next/link";
export async function BorderCountry({ code }: { code: string }) {
  const country = await loadCountriesByTag({ code });
  return (
    <li>
      <Link
        className="p-2 px-6 outstand outstand-button block rounded shadow-2xl"
        href={`/${country.names.common}`}
      >
        {country.names.common}
      </Link>
    </li>
  );
}
