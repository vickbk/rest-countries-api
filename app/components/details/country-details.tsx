export const CountryDetails = () => {
  return (
    <article>
      <h3 className="sr-only">details title</h3>
      <ul>
        {[{ name: "the name", value: "the value" }].map(({ name, value }) => (
          <li key={name}>
            <span>{name}:</span> {value}
          </li>
        ))}
      </ul>
    </article>
  );
};
