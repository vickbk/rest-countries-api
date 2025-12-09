import Image from "next/image";
import Link from "next/link";
import { DetailElement } from "../../common/detail-element";
import { CountryType } from "@/app/lib/countries";
import { readableNumber } from "@/app/lib/number-converter";

export const Country = ({
  country: { name, population, flags, capital, region },
}: {
  country: CountryType<["name", "capital", "population", "region", "flags"]>;
}) => {
  const details = [
    ["population", readableNumber(population)],
    ["Region", region],
    ["capital", (capital || []).join(", ")],
  ].map(([name, value]) => ({ name, value }));
  return (
    <article className="outstand rounded-lg flex flex-col justify-between shadow-2xl country-card relative">
      <Image
        className="rounded-t-lg h-50 object-cover"
        src={flags.svg}
        width={1200}
        height={600}
        alt={flags.alt || `${name.common} country flag`}
      />
      <section className="p-8">
        <h3 className="font-semibold text-xl mb-4">
          <Link href={"/" + name.common} className="country-card__link">
            {name.common} <span className="absolute inset-0"></span>
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
