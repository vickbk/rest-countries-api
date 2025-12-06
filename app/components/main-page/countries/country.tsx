import Image from "next/image";

export const Country = () => {
  return (
    <article>
      <Image
        src={"https://flagcdn.com/az.svg"}
        width={1200}
        height={600}
        alt="Sample image"
      />
      <h3>Country name</h3>
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
