import { useState, useEffect, useCallback } from 'react';
import { fetchProductById } from '../api/products';

/**
 * Custom hook for fetching a single product by ID.
 *
 * @param {string|number} id - The product ID
 */
export function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProduct = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchProductById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  return { product, loading, error, retry: loadProduct };
}
