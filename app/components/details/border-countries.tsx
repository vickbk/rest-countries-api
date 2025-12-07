import Link from "next/link";

export const BorderCountries = () => {
  return (
    <article>
      <h3>Border Countries</h3>
      <ul className="flex flex-wrap gap-4 mt-6">
        {[
          { name: "the name", value: "the value" },
          { name: "the name2", value: "the value" },
        ].map(({ name, value }) => (
          <li key={name}>
            <Link className="p-2 px-6 outstand block" href={`/${value}`}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};
