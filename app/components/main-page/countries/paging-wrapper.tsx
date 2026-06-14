"use client";

import { Paging } from "@/shared/paging";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const PagingWrapper = ({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateFunction = useMemo(
    () => (page: number) => {
      const query = new URLSearchParams(searchParams.toString());
      query.set("page", (page + 1).toString());
      router.push(`${pathname}?${query.toString()}`, { scroll: false });
    },
    [pathname, searchParams, router],
  );
  return (
    <Paging
      page={page - 1}
      totalPages={totalPages}
      updateFunction={updateFunction}
    />
  );
};
