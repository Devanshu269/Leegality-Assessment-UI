/**
 * StarRating component — renders filled, half, and empty stars.
 *
 * @param {{ rating: number, size?: number }} props
 */
export default function StarRating({ rating, size = 14 }) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="star-rating__star filled" style={{ fontSize: size }}>
        ★
      </span>
    );
  }

  if (hasHalf) {
    stars.push(
      <span key="half" className="star-rating__star half" style={{ fontSize: size }}>
        ★
      </span>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="star-rating__star" style={{ fontSize: size }}>
        ★
      </span>
    );
  }

  return <span className="star-rating">{stars}</span>;
}
