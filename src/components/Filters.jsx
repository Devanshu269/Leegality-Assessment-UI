import { useState } from 'react';

/**
 * Filters sidebar component with Category, Price Range, and Brand filters.
 *
 * @param {{
 *   categories: Array<{slug: string, name: string}>,
 *   selectedCategory: string|null,
 *   onCategoryChange: (slug: string|null) => void,
 *   priceRange: { min: string, max: string },
 *   onPriceChange: (range: { min: string, max: string }) => void,
 *   brands: string[],
 *   selectedBrands: string[],
 *   onBrandsChange: (brands: string[]) => void,
 *   onClearAll: () => void,
 * }} props
 */
export default function Filters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  brands,
  selectedBrands,
  onBrandsChange,
  onClearAll,
}) {
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      onBrandsChange(selectedBrands.filter((b) => b !== brand));
    } else {
      onBrandsChange([...selectedBrands, brand]);
    }
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    priceRange.min !== '' ||
    priceRange.max !== '' ||
    selectedBrands.length > 0;

  return (
    <aside className="filters" id="filters-sidebar">
      {/* Header */}
      <div className="filters__header">
        <h2 className="filters__title">Filters</h2>
        {hasActiveFilters && (
          <button
            className="filters__clear-btn"
            onClick={onClearAll}
            id="clear-all-filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <div
          className="filter-section__header"
          onClick={() => toggleSection('category')}
          id="filter-category-header"
        >
          <span className="filter-section__title">Category</span>
          <span
            className={`filter-section__toggle ${
              collapsedSections.category ? 'collapsed' : ''
            }`}
          >
            ▾
          </span>
        </div>
        <div
          className={`filter-section__body ${
            collapsedSections.category ? 'collapsed' : ''
          }`}
          style={{ maxHeight: collapsedSections.category ? 0 : '300px' }}
        >
          <div className="filter-category-list">
            {/* All option */}
            <div
              className={`filter-category-item ${selectedCategory === null ? 'active' : ''}`}
              onClick={() => onCategoryChange(null)}
              id="category-all"
            >
              <span className="filter-category-item__radio" />
              <span>All Categories</span>
            </div>

            {categories.map((cat) => (
              <div
                key={cat.slug}
                className={`filter-category-item ${
                  selectedCategory === cat.slug ? 'active' : ''
                }`}
                onClick={() => onCategoryChange(cat.slug)}
                id={`category-${cat.slug}`}
              >
                <span className="filter-category-item__radio" />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <div
          className="filter-section__header"
          onClick={() => toggleSection('price')}
          id="filter-price-header"
        >
          <span className="filter-section__title">Price Range</span>
          <span
            className={`filter-section__toggle ${
              collapsedSections.price ? 'collapsed' : ''
            }`}
          >
            ▾
          </span>
        </div>
        <div
          className={`filter-section__body ${
            collapsedSections.price ? 'collapsed' : ''
          }`}
          style={{ maxHeight: collapsedSections.price ? 0 : '100px' }}
        >
          <div className="filter-price-inputs">
            <div className="filter-price-input">
              <label htmlFor="price-min">Min ($)</label>
              <input
                type="number"
                id="price-min"
                placeholder="0"
                min="0"
                value={priceRange.min}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, min: e.target.value })
                }
              />
            </div>
            <span className="filter-price-separator">—</span>
            <div className="filter-price-input">
              <label htmlFor="price-max">Max ($)</label>
              <input
                type="number"
                id="price-max"
                placeholder="Any"
                min="0"
                value={priceRange.max}
                onChange={(e) =>
                  onPriceChange({ ...priceRange, max: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="filter-section">
        <div
          className="filter-section__header"
          onClick={() => toggleSection('brand')}
          id="filter-brand-header"
        >
          <span className="filter-section__title">Brand</span>
          <span
            className={`filter-section__toggle ${
              collapsedSections.brand ? 'collapsed' : ''
            }`}
          >
            ▾
          </span>
        </div>
        <div
          className={`filter-section__body ${
            collapsedSections.brand ? 'collapsed' : ''
          }`}
          style={{ maxHeight: collapsedSections.brand ? 0 : '260px' }}
        >
          {brands.length === 0 ? (
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', padding: 'var(--space-xs)' }}>
              No brands available
            </p>
          ) : (
            <div className="filter-brand-list">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className={`filter-brand-item ${
                    selectedBrands.includes(brand) ? 'active' : ''
                  }`}
                  onClick={() => handleBrandToggle(brand)}
                  id={`brand-${brand.replace(/\s+/g, '-').toLowerCase()}`}
                >
                  <span className="filter-brand-item__checkbox" />
                  <span>{brand}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
