import { LoadingPlacehoder } from "../common/loading-placeholder";

export function BorderCountryPlaceHolder({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <LoadingPlacehoder
      className={`p-4 basis-20 ${standalone && "min-w-32"} grow outstand shadow`}
    />
  );
}
