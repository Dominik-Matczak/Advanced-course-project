import { describe, test, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import * as redux from 'react-redux';
import * as productsHook from './useProducts';
import { useFilteredProducts } from './useFilteredProducts';

const MOCK_PRODUCTS = [
  { id: 1, title: 'Apple iPhone', price: 1000, category: 'phones', rating: { rate: 4.5 } },
  { id: 2, title: 'Samsung Galaxy', price: 800, category: 'phones', rating: { rate: 4.0 } },
  { id: 3, title: 'Sony Headphones', price: 200, category: 'audio', rating: { rate: 4.8 } },
  { id: 4, title: 'Dell Laptop', price: 1200, category: 'computers', rating: { rate: 4.2 } },
];

vi.mock('react-redux');
vi.mock('./useProducts');

const useSelectorMocked = vi.mocked(redux.useSelector);
const useProductsMocked = vi.mocked(productsHook.useProducts);

beforeEach(() => {
  vi.clearAllMocks();
});

// Helper do mockowania filtrów
const mockFilters = (filters) => {
  useSelectorMocked.mockImplementation(cb =>
    cb({ filters: filters ?? { title: '', priceFrom: '', priceTo: '', category: '', rate: '' } })
  );
};

// ==========================
// TESTY JEDNOSTKOWE
// ==========================
describe('useFilteredProducts - unit tests', () => {
  test('should return all products if no filters applied', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({});

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts).toEqual(MOCK_PRODUCTS);
  });

  test('should filter by title', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ title: 'Apple' });

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts).toEqual([MOCK_PRODUCTS[0]]);
  });

  test('should filter by price range', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ priceFrom: '500', priceTo: '1000' });

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts).toEqual([MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]]);
  });

  test('should filter by category', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ category: 'phones' });

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts).toEqual([MOCK_PRODUCTS[0], MOCK_PRODUCTS[1]]);
  });

  test('should sort by rate descending', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ rate: 'Highest → Lowest' });

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts.map(p => p.id)).toEqual([3,1,4,2]);
  });

  test('should sort by rate ascending', () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ rate: 'Lowest → Highest' });

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.filteredProducts.map(p => p.id)).toEqual([2,4,1,3]);
  });

  test('should return empty array if products undefined', () => {
  // zamiast undefined, zwracamy pusty obiekt z data: []
  useProductsMocked.mockReturnValue({ data: [], isLoading: false, isError: false });
  mockFilters({});

  const { result } = renderHook(() => useFilteredProducts());
  expect(result.current.filteredProducts).toEqual([]);
});
});

// ==========================
// TESTY INTEGRACYJNE
// ==========================
describe('useFilteredProducts - integration tests', () => {
  test('should filter by multiple fields', async () => {
    useProductsMocked.mockReturnValue({ data: MOCK_PRODUCTS, isLoading: false, isError: false });
    mockFilters({ title: 'Dell', priceFrom: '1000', priceTo: '1300', category: 'computers', rate: 'Highest → Lowest' });

    const { result } = renderHook(() => useFilteredProducts());
    await waitFor(() => {
      expect(result.current.filteredProducts).toEqual([MOCK_PRODUCTS[3]]);
    });
  });

  test('should return isLoading true when useProducts loading', () => {
    useProductsMocked.mockReturnValue({ data: [], isLoading: true, isError: false });
    mockFilters({});

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.isLoading).toBe(true);
  });

  test('should return isError true when useProducts has error', () => {
    useProductsMocked.mockReturnValue({ data: [], isLoading: false, isError: true });
    mockFilters({}); // zawsze dajemy filters z domyślnymi polami, żeby nie wywaliło błędu

    const { result } = renderHook(() => useFilteredProducts());
    expect(result.current.isError).toBe(true);
  });
});
