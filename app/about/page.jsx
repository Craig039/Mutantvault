export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="section page-top">
      <div className="shell narrow">
        <p className="eyebrow">About Mutant Vault</p>
        <h1>Built by a collector, for collectors.</h1>
        <p className="lead">
          Mutant Vault specializes in high-grade X-Men and Marvel comics selected for presentation,
          authenticity, and long-term collector appeal.
        </p>
        <div className="content-panel">
          <h2>Our focus</h2>
          <p>
            Grade matters, but it is not the entire story. Wrap, centering, color, registration,
            page quality, and overall eye appeal can make two books in the same grade feel very different.
          </p>
          <h2>Our standard</h2>
          <p>
            Listings are presented clearly, photographed carefully, and shipped securely.
            The goal is a buying experience that feels deliberate, transparent, and collector-grade.
          </p>
        </div>
      </div>
    </section>
  );
}
