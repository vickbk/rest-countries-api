import Link from "next/link";

export const BorderCountries = () => {
  return (
    <article>
      <h3>Border Countries</h3>
      <ul>
        {[{ name: "the name", value: "the value" }].map(({ name, value }) => (
          <li key={name}>
            <Link href={`/${value}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </article>
  );
};
