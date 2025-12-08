import { DetailElement } from "../common/detail-element";

export const CountryDetails = ({
  details,
  title,
}: {
  details: { name: string; value: string }[];
  title: string;
}) => {
  return (
    <article>
      <h3 className="sr-only">{title}</h3>
      <ul className="grid gap-2">
        {details.map((detail, key) => (
          <DetailElement key={key} {...detail} />
        ))}
      </ul>
    </article>
  );
};
