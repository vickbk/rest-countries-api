import { LoadingPlacehoder } from "../../common/loading-placeholder";

export const CountryPlaceholder = () => {
  return (
    <div className="outstand rounded-lg shadow-2xl">
      <LoadingPlacehoder className="py-20 background rounded-t-lg shadow" />
      <div className="p-8 grid gap-4">
        <LoadingPlacehoder className="background py-4" />
        {["3/4", "1/2", "full"].map((size, key) => (
          <LoadingPlacehoder
            key={key}
            className={`background py-2 w-${size} shadow`}
          />
        ))}
      </div>
    </div>
  );
};

export const CountriesPlaceHolder = () => {
  return Array(12)
    .fill(null)
    .map((_, key) => <CountryPlaceholder key={key} />);
};
