export const DetailElement = ({
  name,
  value,
}: Record<"name" | "value", string>) => {
  return (
    <li className="font-normal not-last:mb-4">
      <span className="font-semibold text-lg capitalize">{name}</span>: {value}
    </li>
  );
};
