import Link from "next/link";

export default function ComicCard({ comic }) {
  const isSold = comic.status === "sold";
  const image = comic.images?.[0];

  return (
    <article className="comic-card">
      <div className="comic-image-wrap">
        {image ? (
          <img src={image} alt={`${comic.title} front cover`} className="comic-image" />
        ) : (
          <div className="comic-placeholder">
            <span>{comic.title}</span>
            <small>Add front image</small>
          </div>
        )}
        <span className={`status-badge ${isSold ? "sold" : ""}`}>{comic.badge}</span>
      </div>

      <div className="comic-card-body">
        <p className="eyebrow">{comic.publisher} · {comic.year}</p>
        <h3>{comic.title}</h3>

        <div className="grade-row">
          <span>{comic.grade}</span>
          <span>{comic.pages}</span>
        </div>

        <p>{comic.keyDetails}</p>

        <div className="card-footer">
          <strong>{comic.price}</strong>
          <Link href={`/inventory/${comic.slug}`} className="text-link">
            View Book
          </Link>
        </div>
      </div>
    </article>
  );
}
