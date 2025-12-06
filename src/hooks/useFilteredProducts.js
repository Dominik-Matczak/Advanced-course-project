import { useState, useMemo, useCallback } from "react";
import { useProducts } from "./useProducts"; 
import { useSelector } from "react-redux";

export const useFilteredProducts = () => {
  const { data: products, isLoading, isError } = useProducts();

  const filters = useSelector((state) => state.filters);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let tempProducts = [...products];

    if (filters.title) {
      const search = filters.title.toLowerCase();
      tempProducts = tempProducts.filter(p => p.title.toLowerCase().includes(search));
    }

    if (filters.priceFrom) {
      const from = parseFloat(filters.priceFrom);
      tempProducts = tempProducts.filter(p => p.price >= from);
    }

    if (filters.priceTo) {
      const to = parseFloat(filters.priceTo);
      tempProducts = tempProducts.filter(p => p.price <= to);
    }
    if (filters.category) {
      tempProducts = tempProducts.filter(p => p.category === filters.category);
    }

    if (filters.rate) {
      tempProducts.sort((a, b) => {
        if (filters.rate === "Highest → Lowest") {
          return b.rating.rate - a.rating.rate;
        } else if (filters.rate === "Lowest → Highest") {
          return a.rating.rate - b.rating.rate;
        }
        return 0; 
      });
    }

    return tempProducts;
  }, [products, filters]);

  return {
    filteredProducts,
    filters,
    isLoading,
    isError,
  };
};