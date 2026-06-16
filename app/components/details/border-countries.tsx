import { Suspense } from "react";
import { BorderCountry } from "./border-country";
import { BorderCountryPlaceHolder } from "./border-coutry-placeholder";

export const BorderCountries = async ({
  borders = [],
}: {
  borders?: string[];
}) => {
  return (
    <article className="sm:col-span-full sm:flex gap-4 sm:items-center">
      <h3>Border Countries:</h3>
      <ul className="flex flex-wrap gap-4 mt-6 sm:mt-0">
        {borders.map((code) => (
          <Suspense
            key={code}
            fallback={<BorderCountryPlaceHolder standalone />}
          >
            <BorderCountry code={code} />
          </Suspense>
        ))}
      </ul>
    </article>
  );
};
