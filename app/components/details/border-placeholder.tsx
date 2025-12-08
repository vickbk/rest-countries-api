import { LoadingPlacehoder } from "../common/loading-placeholder";

export const BorderPlaceholder = () => {
  return (
    <>
      <div>Border Countries:</div>
      <div className="flex flex-wrap gap-4 col-span-full">
        {Array(4)
          .fill(null)
          .map((_, key) => (
            <LoadingPlacehoder
              key={key}
              className="p-4 basis-20 grow outstand"
            />
          ))}
      </div>
    </>
  );
};
