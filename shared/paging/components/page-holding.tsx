import { SROnly } from "@shared/utils";
import { detailCloser } from "../utils/details-helper";
import { PagingButton } from "./paging-button";

export const PagingGapHolding = ({
  start,
  end,
  updateFunction,
}: {
  start: number;
  end: number;
  updateFunction: (key: number) => void;
}) => {
  const count = end - start;
  const tooMuchPages = count > 10;
  return (
    count > 0 && (
      <li>
        <details ref={detailCloser} className="paging-suspense">
          <summary className="outstand-button paging-suspense__summary cursor-pointer p-2 rounded-lg">
            <SROnly>Show previous pages</SROnly>...
          </summary>
          <ol className="paging-suspense__container">
            {Array(tooMuchPages ? 10 : count)
              .fill(null)
              .map((_, key) => (
                <PagingButton
                  key={key}
                  onClickFunction={() => updateFunction(key + start)}
                >
                  <SROnly>Go to page</SROnly> {key + start + 1}
                </PagingButton>
              ))}
            {tooMuchPages && (
              <>
                <PagingGapHolding
                  start={start + 10}
                  end={end - 1}
                  updateFunction={updateFunction}
                />
                <PagingButton onClickFunction={() => updateFunction(end - 1)}>
                  <SROnly>Go to page</SROnly> {end}
                </PagingButton>
              </>
            )}
          </ol>
        </details>
      </li>
    )
  );
};
