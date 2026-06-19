import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail';
import { Spinner } from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import StarRating from '../components/StarRating';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // The product hook fetches the detailed item based on the ID
  const { product, loading, error, retry } = useProductDetail(id);

  // Manage which thumbnail is currently selected as the main hero image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Navigate back to the listing page.
  // Because we passed `currentParams` in the ProductCard via `navigate(\`/product/\${product.id}\${currentParams}\`)`,
  // `location.search` here contains those exact params. We append them to the root route to restore filters.
  const handleBack = () => {
    navigate(`/${location.search}`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <Spinner message="Loading product details..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
        <ErrorMessage message={error || 'Product not found'} onRetry={retry} />
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const originalPrice = (product.price / (1 - product.discountPercentage / 100)).toFixed(2);
  const images = product.images || [product.thumbnail];

  // Determine stock status styling
  let stockClass = 'in-stock';
  let stockText = 'In Stock';
  if (product.stock === 0) {
    stockClass = 'out-of-stock';
    stockText = 'Out of Stock';
  } else if (product.stock < 10) {
    stockClass = 'low-stock';
    stockText = `Low Stock (${product.stock} left)`;
  }

  return (
    <div className="product-detail">
      <button className="product-detail__back-btn" onClick={handleBack}>
        ← Back to Listing
      </button>

      <div className="product-detail__content">
        {/* Left Column: Image Gallery */}
        <div className="product-detail__gallery">
          <div className="product-detail__main-image">
            <img src={images[activeImageIndex]} alt={product.title} />
          </div>

          {images.length > 1 && (
            <div className="product-detail__thumbnails">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`product-detail__thumb ${activeImageIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`${product.title} thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="product-detail__info">
          <div className="product-detail__breadcrumb">
            <span onClick={handleBack} style={{ cursor: 'pointer' }}>
              Products
            </span>
            &nbsp;/&nbsp;
            <span>{product.category}</span>
          </div>

          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__rating-row">
            <StarRating rating={product.rating} size={18} />
            <span className="product-detail__rating-value">{product.rating.toFixed(1)}</span>
            <span className="product-detail__rating-count">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <div className="product-detail__price-section">
            <span className="product-detail__price">${product.price.toFixed(2)}</span>
            {hasDiscount && (
              <>
                <span className="product-detail__original-price">${originalPrice}</span>
                <span className="product-detail__discount">
                  -{Math.round(product.discountPercentage)}%
                </span>
              </>
            )}
          </div>

          <div className={`product-detail__stock ${stockClass}`}>
            {stockClass === 'in-stock' && '✓ '}
            {stockClass === 'out-of-stock' && '✕ '}
            {stockClass === 'low-stock' && '⚠️ '}
            {stockText}
          </div>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__divider" />

          <div className="product-detail__meta">
            {product.brand && (
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">Brand</span>
                <span className="product-detail__meta-value">{product.brand}</span>
              </div>
            )}
            <div className="product-detail__meta-item">
              <span className="product-detail__meta-label">Category</span>
              <span className="product-detail__meta-value">{product.category}</span>
            </div>
            {product.sku && (
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">SKU</span>
                <span className="product-detail__meta-value">{product.sku}</span>
              </div>
            )}
            {product.weight > 0 && (
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">Weight</span>
                <span className="product-detail__meta-value">{product.weight} oz</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">Shipping</span>
                <span className="product-detail__meta-value">{product.shippingInformation}</span>
              </div>
            )}
            {product.warrantyInformation && (
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">Warranty</span>
                <span className="product-detail__meta-value">{product.warrantyInformation}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="product-detail__reviews">
          <h2 className="product-detail__reviews-title">Customer Reviews</h2>
          <div className="product-detail__reviews-list">
            {product.reviews.map((review, i) => (
              <div key={i} className="review-card">
                <div className="review-card__header">
                  <span className="review-card__author">{review.reviewerName}</span>
                  <span className="review-card__date">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="review-card__comment">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
