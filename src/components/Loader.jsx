/**
 * Skeleton loader cards for the product grid loading state.
 *
 * @param {{ count?: number }} props
 */
export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-card__image skeleton" />
          <div className="skeleton-card__body">
            <div className="skeleton-card__line skeleton" style={{ width: '40%' }} />
            <div className="skeleton-card__line skeleton skeleton-card__line--medium" />
            <div className="skeleton-card__line skeleton skeleton-card__line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Centered spinner with optional message.
 *
 * @param {{ message?: string }} props
 */
export function Spinner({ message = 'Loading...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <span className="spinner-container__text">{message}</span>
    </div>
  );
}
