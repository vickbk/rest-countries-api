"use client";
import { updateSearchParams } from "@/app/lib/update-search-params";
import { SROnly } from "../shared/SROnly";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "../common/icon";
import { useEffect } from "react";

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
    if (page > totalPages) updatePage("");
  });
  return (
    <ol className="p-4 gap-4 col-span-full flex flex-wrap justify-center">
      {page !== 1 && (
        <PagingButton onClickFunction={() => updatePage(page - 1 + "")}>
          <SROnly>Go to previous page</SROnly> <Icon name="chevron-left" />
        </PagingButton>
      )}
      {Array(totalPages)
        .fill(null)
        .map((_, key) => (
          <PagingButton
            key={key}
            onClickFunction={() => updatePage(key + 1 + "")}
            isActive={page === key + 1}
          >
            <SROnly>Go to Page</SROnly> {key + 1}
          </PagingButton>
        ))}
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
        className={`outstand p-4 rounded-lg ${
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
