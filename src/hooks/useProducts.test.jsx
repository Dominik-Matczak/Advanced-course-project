import { describe, test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProducts } from "./useProducts";

const mockUseQuery = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: (...args) => mockUseQuery(...args),
}));

describe("useProducts hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns data successfully", () => {
    const fakeData = [{ id: 1, title: "Product A" }];
    mockUseQuery.mockReturnValue({
      data: fakeData,
      isLoading: false,
      isError: false,
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.data).toEqual(fakeData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  test("returns loading state", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  test("returns error state", () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(true);
  });
});
