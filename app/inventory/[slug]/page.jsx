import { notFound } from "next/navigation";
import inventory from "../../../data/inventory.json";
import ComicGallery from "../../../components/ComicGallery";

export function generateStaticParams() {
  return inventory.map((comic) => ({ slug: comic.slug }));
}

export function generateMetadata({ params }) {
  const comic = inventory.find((item) => item.slug === params.slug);
  if (!comic) return {};

  return {
    title: `${comic.title} ${comic.grade}`,
    description: `${comic.title}, ${comic.grade}, ${comic.pages}. ${comic.keyDetails}`,
    openGraph: {
      images: comic.images?.[0] ? [comic.images[0]] : [],
    },
  };
}

export default function ComicDetailPage({ params }) {
  const comic = inventory.find((item) => item.slug === params.slug);
  if (!comic) notFound();

  const sold = comic.status === "sold";

  return (
    <section className="section page-top">
      <div className="shell detail-layout">
        <ComicGallery title={comic.title} images={comic.images || []} />

        <article className="detail-copy">
          <p className="eyebrow">{comic.publisher} · {comic.year}</p>
          <h1>{comic.title}</h1>

          <div className="detail-grade">
            <strong>{comic.grade}</strong>
            <span>{comic.pages}</span>
          </div>

          <div className="detail-price">{comic.price}</div>
          <span className={`detail-status ${sold ? "sold" : ""}`}>
            {sold ? "Sold" : "Available"}
          </span>

          <section className="detail-section">
            <h2>Key Details</h2>
            <p>{comic.keyDetails}</p>
          </section>

          <section className="detail-section">
            <h2>Presentation Notes</h2>
            <p>{comic.presentation}</p>
          </section>

          <section className="detail-section">
            <h2>Shipping</h2>
            <p>
              Securely boxed, tracked, and insured shipping. Additional books
              may be bundled when available.
            </p>
          </section>

          {!sold && (
            <a
              href={`mailto:info@mutantvault.com?subject=${encodeURIComponent(
                `Inquiry: ${comic.title} ${comic.grade}`
              )}`}
              className="button primary detail-button"
            >
              Inquire to Purchase
            </a>
          )}
        </article>
      </div>
    </section>
  );
}
