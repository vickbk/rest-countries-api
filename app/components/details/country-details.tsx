import { DetailElement } from "../common/detail-element";

export const CountryDetails = () => {
  return (
    <article>
      <h3 className="sr-only">details title</h3>
      <ul>
        {[
          { name: "the name", value: "the value" },
          { name: "the name", value: "the value" },
          { name: "the name", value: "the value" },
          { name: "the name", value: "the value" },
        ].map((detail, key) => (
          <DetailElement key={key} {...detail} />
        ))}
      </ul>
    </article>
  );
};
