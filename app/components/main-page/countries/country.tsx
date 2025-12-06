import Image from "next/image";
import Link from "next/link";

export const Country = () => {
  return (
    <article className="outstand rounded-lg">
      <Image
        src={"https://flagcdn.com/az.svg"}
        width={1200}
        height={600}
        alt="Sample image"
      />
      <div className="p-8">
        <h3 className="font-semibold text-2xl mb-4">
          <Link href={"/country"}>Country name</Link>{" "}
        </h3>
        <ul>
          {[{ name: "population", value: 81770900 }].map(
            ({ name, value }, key) => (
              <li key={key} className="font-normal">
                <span className="font-semibold text-lg capitalize">{name}</span>
                : {value}
              </li>
            )
          )}
        </ul>
      </div>
    </article>
  );
};
