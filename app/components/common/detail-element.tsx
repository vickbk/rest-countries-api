export const DetailElement = ({
  name,
  value,
}: Record<"name" | "value", string>) => {
  return (
    <li className="font-normal">
      <span className="font-semibold capitalize">{name}</span>:{" "}
      <span
        className="c-foreground"
        style={{ "--txt-accent": 0.75 } as React.CSSProperties}
      >
        {value}
      </span>
    </li>
  );
};
