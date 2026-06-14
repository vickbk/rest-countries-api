import { BorderCountryPlaceHolder } from "./border-coutry-placeholder";

export const BorderPlaceholder = () => {
  return (
    <>
      <div>Border Countries:</div>
      <div className="flex flex-wrap gap-4 col-span-full">
        {Array(4)
          .fill(null)
          .map((_, key) => (
            <BorderCountryPlaceHolder key={key} />
          ))}
      </div>
    </>
  );
};
