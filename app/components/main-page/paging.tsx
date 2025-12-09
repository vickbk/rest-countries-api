"use client";
import { updateSearchParams } from "@/app/lib/update-search-params";
import { SROnly } from "../shared/SROnly";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../common/bi-icon";
import { useEffect } from "react";
import { CustomDetails } from "../shared/CustomDetails";

export const Paging = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const updatePage = (value: string) => {
    replace(updateSearchParams({ param: "page", value, pathname }));
  };
  // in case the new results have less pages than last page in use go back to page 1
  useEffect(() => {
    if (totalPages !== 0 && page > totalPages) updatePage("");
  });
  return (
    <ol className="p-4 gap-4 col-span-full flex flex-wrap justify-center items-center relative">
      {page !== 1 && (
        <PagingButton onClickFunction={() => updatePage(page - 1 + "")}>
          <SROnly>Go to previous page</SROnly> <Icon name="chevron-left" />
        </PagingButton>
      )}
      <PagingButton
        onClickFunction={() => updatePage("1")}
        isActive={page === 1}
      >
        <SROnly>Go to Page</SROnly> 1
      </PagingButton>
      <PagingGapHolding start={2} end={page} updateFunction={updatePage} />

      {page !== 1 && page !== totalPages && (
        <PagingButton
          onClickFunction={() => updatePage(page + "")}
          isActive={true}
        >
          <SROnly>Go to Page</SROnly> {page}
        </PagingButton>
      )}

      <PagingGapHolding
        start={page + 1}
        end={totalPages}
        updateFunction={updatePage}
      />
      <PagingButton
        onClickFunction={() => updatePage(totalPages + "")}
        isActive={page === totalPages}
      >
        <SROnly>Go to Page</SROnly> {totalPages}
      </PagingButton>
      {page < totalPages && (
        <PagingButton onClickFunction={() => updatePage(page + 1 + "")}>
          <SROnly>Go to next page</SROnly> <Icon name="chevron-right" />
        </PagingButton>
      )}
    </ol>
  );
};

const PagingButton = ({
  children,
  onClickFunction,
  isActive = false,
}: {
  children: React.ReactNode;
  onClickFunction: () => void;
  isActive?: boolean;
}) => {
  return (
    <li>
      <button
        className={`outstand outstand-button p-4 rounded-lg shadow-2xl ${
          isActive ? "scale-85 opacity-40" : ""
        }`}
        type="button"
        onClick={onClickFunction}
        disabled={isActive}
      >
        {children}
      </button>
    </li>
  );
};

const PagingGapHolding = ({
  start,
  end,
  updateFunction,
}: {
  start: number;
  end: number;
  updateFunction: (key: string) => void;
}) => {
  const count = end - start;
  return (
    count > 0 && (
      <li>
        <CustomDetails className="paging-suspense">
          <summary className="outstand-button paging-suspense__summary cursor-pointer p-2 rounded-lg">
            <SROnly>Show previous pages</SROnly>...
          </summary>
          <ol className="paging-suspense__container">
            {Array(count)
              .fill(null)
              .map((_, key) => (
                <PagingButton
                  key={key}
                  onClickFunction={() => updateFunction(key + start + "")}
                >
                  <SROnly>Go to page</SROnly> {key + start}
                </PagingButton>
              ))}
          </ol>
        </CustomDetails>
      </li>
    )
  );
};
