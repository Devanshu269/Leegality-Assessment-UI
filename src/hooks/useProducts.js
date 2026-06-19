import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../api/products';

/**
 * Custom hook for fetching and filtering products.
 * Handles category-based API fetching and client-side price/brand filtering.
 *
 * @param {string|null} category - Selected category slug (null = all)
 * @param {{ min: number, max: number }} priceRange - Price filter range
 * @param {string[]} selectedBrands - Array of selected brand names
 * @param {number} page - Current page number (1-indexed)
 * @param {number} perPage - Items per page
 */
export function useProducts(category, priceRange, selectedBrands, page = 1, perPage = 12) {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API (all or by category)
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data;
      if (category) {
        data = await fetchProductsByCategory(category);
      } else {
        data = await fetchProducts(0); // fetch all (limit=0 returns all 194)
      }
      setAllProducts(data.products || []);
    } catch (err) {
      setError(err.message);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Extract unique brands from all loaded products
  const availableBrands = [...new Set(
    allProducts
      .map(p => p.brand)
      .filter(Boolean)
  )].sort();

  // Apply client-side filters (price + brand)
  const filteredProducts = allProducts.filter(product => {
    // Price filter
    if (priceRange.min !== '' && product.price < Number(priceRange.min)) return false;
    if (priceRange.max !== '' && product.price > Number(priceRange.max)) return false;

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

    return true;
  });

  // Pagination
  const totalFiltered = filteredProducts.length;
  const totalPages = Math.ceil(totalFiltered / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + perPage);

  return {
    products: paginatedProducts,
    totalProducts: totalFiltered,
    totalPages,
    loading,
    error,
    availableBrands,
    retry: loadProducts,
  };
}
