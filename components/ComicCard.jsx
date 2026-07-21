import Link from "next/link";
import { imageSource, imageAlt } from "../lib/images";

export default function ComicCard({ comic }) {
  const image = comic.images?.[0];
  const src = imageSource(image, "thumb");
  const href = `/inventory/${comic.slug}`;

  return (
    <Link
      className="comic-card-link"
      href={href}
      aria-label={`View ${comic.title}`}
    >
      <article className="comic-card">
        <div className="comic-image-wrap">
          {src ? (
            <img
              src={src}
              alt={imageAlt(image, `${comic.title} front cover`)}
              className="comic-image"
              loading="lazy"
            />
          ) : (
            <div className="comic-placeholder">
              <span>{comic.title}</span>
              <small>Photos coming soon</small>
            </div>
          )}
          <span className={`status-badge ${comic.status}`}>{comic.badge}</span>
        </div>

        <div className="comic-card-body">
          <p className="eyebrow">
            {comic.publisher} · {comic.year}
          </p>
          <h3>{comic.title}</h3>
          <div className="grade-row">
            <span>{comic.grade}</span>
            <span>{comic.pages}</span>
          </div>
          <p>{comic.keyDetails}</p>
          <div className="card-footer">
            <strong>{comic.price}</strong>
            <span className="text-link">View Book</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
