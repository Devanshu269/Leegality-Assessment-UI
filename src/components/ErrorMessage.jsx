/**
 * Error display with retry button.
 *
 * @param {{ message?: string, onRetry?: () => void }} props
 */
export default function ErrorMessage({
  message = 'Something went wrong. Please try again.',
  onRetry,
}) {
  return (
    <div className="error-message" role="alert">
      <div className="error-message__icon">⚠️</div>
      <h3 className="error-message__title">Oops!</h3>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button
          className="error-message__retry-btn"
          onClick={onRetry}
          id="error-retry-btn"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
