import ProductCard from './ProductCard';
import { SkeletonGrid } from './Loader';
import ErrorMessage from './ErrorMessage';

/**
 * Product grid component that renders cards, loading skeletons, or error/empty states.
 *
 * @param {{ products: Array, loading: boolean, error: string|null, totalProducts: number, onRetry: () => void }} props
 */
export default function ProductGrid({ products, loading, error, totalProducts, onRetry }) {
  if (loading) {
    return <SkeletonGrid count={8} />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🔍</div>
        <h3 className="empty-state__title">No products found</h3>
        <p className="empty-state__text">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="product-grid__header">
        <span className="product-grid__count">
          Showing <span>{products.length}</span> of <span>{totalProducts}</span> products
        </span>
      </div>
      <div className="product-grid" id="product-grid">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>
    </>
  );
}
