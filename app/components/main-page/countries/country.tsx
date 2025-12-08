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
    <article className="outstand rounded-lg">
      <Image
        className="rounded-t-lg"
        src={flags.svg}
        width={1200}
        height={600}
        alt={flags.alt || `${name.common} country flag`}
      />
      <section className="p-8">
        <h3 className="font-semibold text-xl mb-4">
          <Link href={"/country"}>{name.common}</Link>{" "}
        </h3>
        <ul>
          {details.map((detail, key) => (
            <DetailElement key={key} {...detail} />
          ))}
        </ul>
      </section>
    </article>
  );
};
