import Link from "next/link";

export default function FeaturedComic({ comic }) {
  if (!comic) return null;

  return (
    <aside className="featured-comic" aria-labelledby="featured-comic-title">
      <div className="featured-heading">
        <span>Featured Comic</span>
      </div>

      <div className="featured-grid">
        <div className="featured-image-wrap">
          {comic.images?.[0] ? (
            <img
              src={comic.images?.[0]}
              alt={`${comic.title} front cover`}
              className="featured-image"
            />
          ) : (
            <div className="featured-placeholder">
              <span>{comic.title}</span>
              <small>Add the front slab photo</small>
            </div>
          )}
        </div>

        <div className="featured-details">
          <p className="eyebrow">{comic.publisher} · {comic.year}</p>
          <h2 id="featured-comic-title">{comic.title}</h2>

          <div className="featured-divider" />

          <ul className="featured-facts">
            <li>
              <span className="fact-icon">◆</span>
              <span>
                <strong>{comic.grade}</strong>
                <small>{comic.pages}</small>
              </span>
            </li>
            <li>
              <span className="fact-icon">★</span>
              <span>
                <strong>Key details</strong>
                <small>{comic.keyDetails}</small>
              </span>
            </li>
            <li>
              <span className="fact-icon">◎</span>
              <span>
                <strong>Presentation</strong>
                <small>{comic.presentation}</small>
              </span>
            </li>
          </ul>

          <div className="featured-price">{comic.price}</div>

          <Link
            href={`/contact?book=${encodeURIComponent(comic.title)}`}
            className="button secondary featured-button"
          >
            View Details
          </Link>
        </div>
      </div>
    </aside>
  );
}
