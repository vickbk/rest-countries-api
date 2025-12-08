import Image from "next/image";
import Link from "next/link";
import { DetailElement } from "../../common/detail-element";
import { CountryType } from "@/app/lib/countries";

export const Country = ({
  country: { name, population, flags, capital },
}: {
  country: CountryType<["name", "capital", "population", "region", "flags"]>;
}) => {
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
        <h3 className="font-semibold text-2xl mb-4">
          <Link href={"/country"}>{name.common}</Link>{" "}
        </h3>
        <ul>
          {[{ name: "population", value: "81770900" }].map((detail, key) => (
            <DetailElement key={key} {...detail} />
          ))}
        </ul>
      </section>
    </article>
  );
};
