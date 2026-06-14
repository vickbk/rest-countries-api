"use client";
import { SROnly } from "@shared/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { PagingGapHolding } from "./page-holding";
import { PagingButton } from "./paging-button";

export const Paging = ({
  page,
  totalPages,
  updateFunction,
}: {
  page: number;
  totalPages: number;
  updateFunction: (page: number) => void;
}) => {
  // in case the new results have less pages than last page in use go back to page 0
  useEffect(() => {
    if (totalPages !== 0 && page > totalPages) updateFunction(0);
  });

  if (totalPages <= 1) return null;
  return (
    <ol className="p-4 gap-4 col-span-full flex flex-wrap justify-center items-center relative">
      {page !== 0 && (
        <PagingButton onClickFunction={() => updateFunction(page - 1)}>
          <SROnly>Go to previous page</SROnly> <ChevronLeft />
        </PagingButton>
      )}
      <PagingButton
        onClickFunction={() => updateFunction(0)}
        isActive={page === 0}
      >
        <SROnly>Go to Page</SROnly> 1
      </PagingButton>
      <PagingGapHolding start={1} end={page} updateFunction={updateFunction} />

      {page !== 0 && page !== totalPages - 1 && (
        <PagingButton
          onClickFunction={() => updateFunction(page)}
          isActive={true}
        >
          <SROnly>Go to Page</SROnly> {page + 1}
        </PagingButton>
      )}

      <PagingGapHolding
        start={page + 1}
        end={totalPages - 1}
        updateFunction={updateFunction}
      />
      <PagingButton
        onClickFunction={() => updateFunction(totalPages - 1)}
        isActive={page === totalPages - 1}
      >
        <SROnly>Go to Page</SROnly> {totalPages}
      </PagingButton>
      {page < totalPages - 1 && (
        <PagingButton onClickFunction={() => updateFunction(page + 1)}>
          <SROnly>Go to next page</SROnly> <ChevronRight />
        </PagingButton>
      )}
    </ol>
  );
};
