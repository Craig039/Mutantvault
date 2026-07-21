import Link from "next/link";
import { imageSource, imageAlt } from "../lib/images";

export default function FeaturedComic({ comic }) {
  if (!comic) return null;

  const image = comic.images?.[0];
  const src = imageSource(image, "display");

  return (
    <aside className="featured-comic" aria-label={`Featured comic: ${comic.title}`}>
      <div className="featured-heading"><span>Featured Comic</span></div>
      <div className="featured-grid">
        <div className="featured-image-wrap">
          {src ? (
            <img
              className="featured-image"
              src={src}
              alt={imageAlt(image, `${comic.title} front cover`)}
            />
          ) : (
            <div className="featured-placeholder">
              <span>{comic.title}</span>
              <small>Photos coming soon</small>
            </div>
          )}
        </div>

        <div className="featured-details">
          <p className="eyebrow">{comic.publisher} · {comic.year}</p>
          <h2 className="featured-title">{comic.title}</h2>
          <div className="featured-divider" />
          <dl className="featured-facts">
            <div>
              <dt>Grade</dt>
              <dd>{comic.grade} · {comic.pages}</dd>
            </div>
            <div>
              <dt>Key details</dt>
              <dd>{comic.keyDetails}</dd>
            </div>
            <div>
              <dt>Mutant Vault notes</dt>
              <dd>{comic.presentation}</dd>
            </div>
          </dl>
          <div className="featured-price">{comic.price}</div>
          <Link href={`/inventory/${comic.slug}`} className="button secondary featured-button">
            Inspect This Book
          </Link>
        </div>
      </div>
    </aside>
  );
}
