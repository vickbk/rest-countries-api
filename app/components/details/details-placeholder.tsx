import { LoadingPlacehoder } from "../common/loading-placeholder";
import { BorderPlaceholder } from "./border-placeholder";

export const DetailsPlaceholder = () => {
  return (
    <div className="grid gap-8 lg:gap-32 lg:grid-cols-2 lg:items-center grow w-full">
      <LoadingPlacehoder className="py-40 outstand" />

      <div className="grid gap-8 sm:grid-cols-2">
        <LoadingPlacehoder className="outstand py-5 col-span-full" />
        {[null, null].map((_, key) => (
          <div className="grid gap-4" key={key}>
            {Array(4)
              .fill(null)
              .map((_, key) => (
                <LoadingPlacehoder className="py-2 outstand" key={key} />
              ))}
          </div>
        ))}

        <BorderPlaceholder />
      </div>
    </div>
  );
};
