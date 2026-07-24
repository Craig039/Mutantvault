import { notFound } from "next/navigation";
import inventory from "../../../data/inventory.json";
import ComicGallery from "../../../components/ComicGallery";
import { imageSource } from "../../../lib/images";

export function generateStaticParams() {
  return inventory.map((comic) => ({ slug: comic.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const comic = inventory.find((item) => item.slug === slug);
  if (!comic) return {};
  return {
    title: `${comic.title} ${comic.grade}`,
    description: `${comic.title}, ${comic.grade}, ${comic.pages}. ${comic.keyDetails}`,
    openGraph: { images: comic.images?.[0] ? [imageSource(comic.images[0], "full")] : [] },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const comic = inventory.find((item) => item.slug === slug);
  if (!comic) notFound();

  const sold = comic.status === "sold";
  const productImages = (comic.images || []).map((image) => imageSource(image, "full")).filter(Boolean);
  const productJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${comic.title} ${comic.grade}`,
    description: comic.keyDetails,
    image: productImages,
    sku: comic.certNumber || comic.slug,
    brand: { "@type": "Brand", name: "Mutant Vault" },
    ...(comic.numericPrice ? {
      offers: {
        "@type": "Offer",
        url: `https://www.mutantvault.com/inventory/${comic.slug}`,
        priceCurrency: "USD",
        price: comic.numericPrice,
        availability: sold ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
        itemCondition: "https://schema.org/UsedCondition",
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "USD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        },
      },
    } : {}),
  };

  return (
    <section className="section page-top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }} />
      <div className="shell detail-layout">
        <ComicGallery title={comic.title} images={comic.images} />
        <article className="detail-copy">
          <p className="eyebrow">{comic.publisher} · {comic.issueDate || comic.year}</p>
          <div className="detail-title-row">
            <h1>{comic.title}</h1>
            {comic.curatorsPick && <span className="curators-pick-badge">Curator&apos;s Pick</span>}
          </div>
          <div className="detail-grade"><strong>{comic.grade}</strong><span>{comic.pages} Pages</span></div>
          {comic.certNumber && (
            <p className="cert-number">CGC Cert #
              <a className="cert-link" href={`https://www.cgccomics.com/certlookup/${comic.certNumber}/`} target="_blank" rel="noopener noreferrer" aria-label={`View CGC certification ${comic.certNumber} on CGC`}>
                {comic.certNumber} ↗
              </a>
            </p>
          )}
          <div className="detail-price">{comic.price}</div>
          <span className={`detail-status ${sold ? "sold" : ""}`}>{sold ? "Sold" : "Available"}</span>

          {comic.curatorNotes?.length > 0 && (
            <section className="curator-notes" aria-labelledby="curator-notes-title">
              <div className="curator-notes-heading">
                <span className="vault-mark" aria-hidden="true">MV</span>
                <div>
                  <p className="eyebrow">Selected for Presentation</p>
                  <h2 id="curator-notes-title">Curator Notes</h2>
                </div>
              </div>
              <ul>{comic.curatorNotes.map((note) => <li key={note}>{note}</li>)}</ul>
              <a className="curator-standard-link" href="/about#curator-notes">How we evaluate each copy →</a>
            </section>
          )}

          <section className="detail-section"><h2>Key Details</h2><p>{comic.keyDetails}</p></section>
          {comic.credits && <section className="detail-section"><h2>Creators</h2><p>{comic.credits}</p></section>}
          <section className="detail-section"><h2>Mutant Vault Notes</h2><p>{comic.presentation}</p></section>
          <section className="detail-section"><h2>Shipping Included</h2><p>U.S. shipping is included in the listed price. The slab will be securely boxed, tracked, and fully insured. Multiple books may be bundled when available.</p></section>
          <p className="inspection-note">The front and back shown are the exact certified comic offered for sale. Open either image full screen to inspect the label, cover, wrap, edges, and case.</p>
          {!sold && <a className="button primary detail-button" href={`mailto:info@mutantvault.com?subject=${encodeURIComponent(`Purchase inquiry: ${comic.title} ${comic.grade} – ${comic.certNumber}`)}`}>Inquire to Purchase</a>}
        </article>
      </div>
    </section>
  );
}
