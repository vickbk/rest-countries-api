import { CountryType } from "@/app/lib/countries";
import { readableNumber } from "@/app/lib/number-converter";
import Image from "next/image";
import Link from "next/link";
import { DetailElement } from "../../common/detail-element";
import { FlagPlaceholder } from "./flag-placeholder";

export const Country = ({
  country: { names, population, flag, capitals, region },
}: {
  country: CountryType<["names", "capitals", "population", "region", "flag"]>;
}) => {
  const details = [
    ["population", readableNumber(population)],
    ["Region", region],
    ["capital", (capitals || []).map((c) => c.name).join(", ")],
  ].map(([name, value]) => ({ name, value }));
  const flagVal = flag.url_png || flag.url_png;
  return (
    <article className="outstand rounded-lg flex flex-col justify-between shadow-2xl country-card relative">
      {flagVal ? (
        <Image
          className="rounded-t-lg h-50 object-cover"
          src={flagVal}
          width={1200}
          height={600}
          alt={flag.description || `${names.common} country flag`}
        />
      ) : (
        <FlagPlaceholder flag={flag} />
      )}
      <section className="p-8">
        <h3 className="font-semibold text-xl mb-4">
          <Link href={"/" + names.common} className="country-card__link">
            {names.common} <span className="absolute inset-0"></span>
          </Link>{" "}
        </h3>
        <ul className="grid gap-1">
          {details.map((detail, key) => (
            <DetailElement key={key} {...detail} />
          ))}
        </ul>
      </section>
    </article>
  );
};
