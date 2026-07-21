import Link from "next/link";
import { imageSource, imageAlt } from "../lib/images";

export default function ComicCard({ comic }) {
  const image = comic.images?.[0];
  const src = imageSource(image, "thumb");
  const href = `/inventory/${comic.slug}`;
  const chips = (comic.cardChips || []).slice(0, 3);

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
            Issue #{comic.issue} · {comic.publisher} · {comic.year}
          </p>
          <h3>{comic.title}</h3>

          <div className="collector-badges">
            <span className="grade-badge">{comic.grade}</span>
            <span className="page-badge">{comic.pages} Pages</span>
          </div>

          {chips.length > 0 && (
            <div className="key-chips" aria-label="Key issue details">
              {chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          )}

          <p className="card-key-details">{comic.keyDetails}</p>

          {comic.eyeAppeal && (
            <div className="eye-appeal">
              <span>Mutant Vault Eye Appeal</span>
              <strong>{comic.eyeAppeal}</strong>
            </div>
          )}

          <div className="card-footer">
            <strong>{comic.price}</strong>
            <span className="text-link">View Book</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
