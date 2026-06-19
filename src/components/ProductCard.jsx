import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

/**
 * Product card component with image, title, price, rating, and discount badge.
 * Navigates to /product/:id on click, preserving current URL search params.
 *
 * @param {{ product: Object, style?: Object }} props
 */
export default function ProductCard({ product, style }) {
  const navigate = useNavigate();

  const discountedPrice = product.price;
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const hasDiscount = product.discountPercentage > 0;

  const handleClick = () => {
    // Preserve current search params so filters survive navigation
    const currentParams = window.location.search;
    navigate(`/product/${product.id}${currentParams}`);
  };

  return (
    <article
      className="product-card"
      onClick={handleClick}
      style={style}
      id={`product-card-${product.id}`}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        {hasDiscount && (
          <span className="product-card__discount-badge">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>

        <div className="product-card__price-row">
          <span className="product-card__price">${discountedPrice.toFixed(2)}</span>
          {hasDiscount && (
            <span className="product-card__original-price">${originalPrice}</span>
          )}
        </div>

        <div className="product-card__rating">
          <StarRating rating={product.rating} />
          <span className="product-card__rating-value">{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
