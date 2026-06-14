import { useState } from "react";

export function usePagination<T>(toPage: T[], pageSize: number) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(toPage.length / pageSize);
  const display = toPage.slice(page * pageSize, (page + 1) * pageSize);
  return { page, setPage, totalPages, display };
}
