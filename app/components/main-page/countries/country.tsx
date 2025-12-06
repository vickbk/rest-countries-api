import Image from "next/image";
import Link from "next/link";

export const Country = () => {
  return (
    <article>
      <Image
        src={"https://flagcdn.com/az.svg"}
        width={1200}
        height={600}
        alt="Sample image"
      />
      <h3>
        <Link href={"/country"}>Country name</Link>{" "}
      </h3>
      <ul>
        {[{ name: "population", value: 81770900 }].map(
          ({ name, value }, key) => (
            <li key={key}>
              {name}: {value}
            </li>
          )
        )}
      </ul>
    </article>
  );
};
