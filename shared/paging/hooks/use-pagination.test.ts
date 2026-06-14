import { act, renderHook } from "@testing-library/react";
import { usePagination } from "./use-pagination";

describe("use Pagination", () => {
  it("should initialize with page 0", () => {
    const data = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => usePagination(data, 2));
    expect(result.current.page).toBe(0);
  });

  it("should calculate correct total pages", () => {
    const data = Array.from({ length: 25 }, (_, i) => i + 1);
    const { result } = renderHook(() => usePagination(data, 10));
    expect(result.current.totalPages).toBe(3);
  });

  it("should display correct items for first page", () => {
    const data = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => usePagination(data, 2));
    expect(result.current.display).toEqual([1, 2]);
  });

  it("should handle pages with remaining items", () => {
    const data = Array.from({ length: 25 }, (_, i) => i + 1);
    const { result } = renderHook(() => usePagination(data, 10));
    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.display).toHaveLength(5); // Only 5 items remain
  });

  it("should handle single page", () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => usePagination(data, 10));
    expect(result.current.totalPages).toBe(1);
  });

  it("should handle empty array", () => {
    const data: number[] = [];
    const { result } = renderHook(() => usePagination(data, 10));
    expect(result.current.totalPages).toBe(0);
    expect(result.current.display).toEqual([]);
  });

  it("should return correct display when changing pages", () => {
    const data = Array.from({ length: 10 }, (_, i) => i + 1);
    const { result } = renderHook(() => usePagination(data, 3));
    expect(result.current.display).toEqual([1, 2, 3]);

    act(() => {
      result.current.setPage(1);
    });
    expect(result.current.display).toEqual([4, 5, 6]);

    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.display).toEqual([7, 8, 9]);
  });

  it("should work with generic types", () => {
    interface Item {
      id: number;
      name: string;
    }
    const data: Item[] = [
      { id: 1, name: "item1" },
      { id: 2, name: "item2" },
      { id: 3, name: "item3" },
    ];
    const { result } = renderHook(() => usePagination(data, 2));
    expect(result.current.display).toHaveLength(2);
    expect(result.current.display[0].name).toBe("item1");
  });
});
