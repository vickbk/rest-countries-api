import Image from "next/image";
import { SROnly } from "../shared/SROnly";
import { BorderCountries } from "./border-countries";
import { CountryDetails } from "./country-details";
import { LoadingPlacehoder } from "../common/loading-placeholder";

export const DetailsPlaceholder = () => {
  return (
    <div className="grid gap-8 lg:gap-32 lg:grid-cols-2 lg:items-center grow w-full">
      <LoadingPlacehoder className="py-40 outstand" />

      <div className="grid gap-8 sm:grid-cols-2">
        <LoadingPlacehoder className="outstand py-5 col-span-full" />
        {[null, null].map((_, key) => (
          <div className="grid gap-4" key={key}>
            {[null, null, null, null].map((_, key) => (
              <LoadingPlacehoder className="py-2 outstand" key={key} />
            ))}
          </div>
        ))}
        <div>Border Countries:</div>
        <div className="flex flex-wrap gap-4 col-span-full">
          {Array(4)
            .fill(null)
            .map((_, key) => (
              <LoadingPlacehoder
                key={key}
                className="p-4 basis-20 grow outstand"
              />
            ))}
        </div>
      </div>
    </div>
  );
};
