import Link from "next/link";
import inventory from "../data/inventory.json";
import FeaturedComic from "../components/FeaturedComic";
import NewArrivals from "../components/NewArrivals";
import ComicCard from "../components/ComicCard";

export const dynamic = "force-dynamic";

function shuffleComics(comics) {
  const shuffled = [...comics];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

export default function Home() {
  const available = inventory.filter((comic) => comic.status === "available");
  const featured = available.find((comic) => comic.featured) || available[0];

  const newest = [...available]
    .filter((comic) => comic.slug !== featured?.slug)
    .sort((a, b) => (b.arrivalOrder || 0) - (a.arrivalOrder || 0))
    .slice(0, 4);

  const excludedSlugs = new Set([
    featured?.slug,
    ...newest.map((comic) => comic.slug),
  ]);

  const vaultTreasures = shuffleComics(
    available.filter((comic) => !excludedSlugs.has(comic.slug)),
  ).slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="shell hero-shell hero-grid">
          <div className="hero-copy">
            <div className="hero-monogram" aria-hidden="true">MV</div>
            <h1>For collectors, curated by a collector.</h1>
            <p className="hero-text">
              Certified X-Men comics hand-selected for eye appeal, photographed
              exactly as offered, and shipped securely with tracking and insurance.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/inventory">
                Browse the Vault
              </Link>
              <Link className="button secondary" href="/about">
                Our Standards
              </Link>
            </div>
            <div className="trust-row">
              <span>Exact book pictured</span>
              <span>Insured shipping</span>
              <span>Collector-owned inventory</span>
            </div>
          </div>
          <FeaturedComic comic={featured} />
        </div>
      </section>

      <NewArrivals comics={newest} />

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Available now</p>
              <h2>Treasures from the Vault</h2>
            </div>
            <Link className="text-link" href="/inventory">
              Browse all inventory
            </Link>
          </div>
          <div className="card-grid">
            {vaultTreasures.map((comic) => (
              <ComicCard key={comic.slug} comic={comic} />
            ))}
          </div>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell split-callout">
          <div>
            <p className="eyebrow">Inspect before you buy</p>
            <h2>See the comic—not just the grade.</h2>
            <p>
              Every listing includes high-resolution photographs of the exact comic
              you&apos;ll receive. Zoom in to inspect the CGC label, case, wrap,
              corners, spine, and cover so you can evaluate the book with confidence
              before purchasing.
            </p>
          </div>
          <Link className="button primary" href="/inventory">
            Browse the Vault
          </Link>
        </div>
      </section>
    </>
  );
}
