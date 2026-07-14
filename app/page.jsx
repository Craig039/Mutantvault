import Link from "next/link";
import inventory from "../data/inventory.json";
import ComicCard from "../components/ComicCard";

export default function HomePage() {
  const available = inventory.filter((item) => item.status === "available").slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Collector-focused. Presentation-driven.</p>
            <h1>Curated high-grade X-Men & Marvel comics.</h1>
            <p className="hero-text">
              Mutant Vault focuses on certified books with strong eye appeal, trusted presentation,
              secure shipping, and collector-grade service.
            </p>
            <div className="button-row">
              <Link className="button primary" href="/inventory">View Inventory</Link>
              <Link className="button secondary" href="/about">Why Mutant Vault</Link>
            </div>
          </div>
          <div className="hero-logo-panel">
            <img src="/brand/mutant-vault-primary.png" alt="Mutant Vault" />
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><strong>Curated</strong><span>Selected for eye appeal</span></div>
          <div><strong>Authentic</strong><span>Certified books and clear details</span></div>
          <div><strong>Secure</strong><span>Boxed, tracked, and insured shipping</span></div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Available now</p>
              <h2>Featured inventory</h2>
            </div>
            <Link href="/inventory" className="text-link">Browse all inventory</Link>
          </div>
          <div className="card-grid">
            {available.map((comic) => <ComicCard key={comic.slug} comic={comic} />)}
          </div>
        </div>
      </section>

      <section className="section dark-panel">
        <div className="shell split-callout">
          <div>
            <p className="eyebrow">The Mutant Vault standard</p>
            <h2>Why this copy matters.</h2>
            <p>
              Every listing is built around the actual book: wrap, centering, registration,
              color, page quality, and overall presentation. The goal is not simply to sell a grade,
              but to present a copy a collector can understand and appreciate.
            </p>
          </div>
          <Link href="/about" className="button primary">Read Our Approach</Link>
        </div>
      </section>
    </>
  );
}
