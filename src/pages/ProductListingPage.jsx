import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../components/Pagination';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';

const PRODUCTS_PER_PAGE = 12;

/**
 * Product Listing Page — displays filters sidebar and product grid with pagination.
 * Uses URL search params to persist filter state across navigation.
 */
export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial filter state from URL params
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get('category') || null
  );
  const [priceRange, setPriceRange] = useState({
    min: searchParams.get('minPrice') || '',
    max: searchParams.get('maxPrice') || '',
  });
  const [selectedBrands, setSelectedBrands] = useState(
    searchParams.get('brands') ? searchParams.get('brands').split(',') : []
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );

  // Fetch categories
  const { categories } = useCategories();

  // Fetch and filter products
  const {
    products,
    totalProducts,
    totalPages,
    loading,
    error,
    availableBrands,
    retry,
  } = useProducts(selectedCategory, priceRange, selectedBrands, currentPage, PRODUCTS_PER_PAGE);

  // Sync filter state to URL params
  const updateSearchParams = useCallback(() => {
    const params = {};
    if (selectedCategory) params.category = selectedCategory;
    if (priceRange.min) params.minPrice = priceRange.min;
    if (priceRange.max) params.maxPrice = priceRange.max;
    if (selectedBrands.length > 0) params.brands = selectedBrands.join(',');
    if (currentPage > 1) params.page = String(currentPage);

    setSearchParams(params, { replace: true });
  }, [selectedCategory, priceRange, selectedBrands, currentPage, setSearchParams]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  // Reset page to 1 when filters change
  const handleCategoryChange = (slug) => {
    setSelectedCategory(slug);
    setSelectedBrands([]); // Clear brands when category changes since brands are derived from products
    setCurrentPage(1);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setCurrentPage(1);
  };

  const handleBrandsChange = (brands) => {
    setSelectedBrands(brands);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSelectedCategory(null);
    setPriceRange({ min: '', max: '' });
    setSelectedBrands([]);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="listing-layout">
      <div className="listing-layout__sidebar">
        <Filters
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          brands={availableBrands}
          selectedBrands={selectedBrands}
          onBrandsChange={handleBrandsChange}
          onClearAll={handleClearAll}
        />
      </div>

      <main className="listing-layout__main">
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
          totalProducts={totalProducts}
          onRetry={retry}
        />

        {!loading && !error && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}
