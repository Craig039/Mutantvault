export const metadata = { title: "About" };

export default function Page() {
  return (
    <section className="section page-top">
      <div className="shell narrow">
        <p className="eyebrow">About Mutant Vault</p>
        <h1>Built by a collector, for collectors.</h1>
        <p className="lead">Mutant Vault specializes in high-grade X-Men and Marvel comics selected for presentation, authenticity, and collector appeal.</p>

        <div className="content-panel">
          <h2>Grade is only the beginning</h2>
          <p>Wrap, centering, staple placement, registration, color, page quality, and other manufacturing characteristics can make two books in the same grade feel very different.</p>
          <h2>Clear presentation</h2>
          <p>Listings are photographed carefully, described honestly, and shipped securely.</p>
        </div>

        <section className="curator-standard" id="curator-notes" aria-labelledby="curator-standard-title">
          <p className="eyebrow">Our Collector Standard</p>
          <h2 id="curator-standard-title">What are Curator Notes?</h2>
          <p className="curator-standard-intro">Every comic offered by Mutant Vault is personally selected. Beyond the CGC grade, each book is evaluated for manufacturing quality and visual presentation—including wrap, centering, staple placement, registration, color, and other characteristics collectors value that may not materially affect the CGC grade.</p>

          <div className="curator-standard-callout">
            <strong>Curator Notes do not replace or modify the CGC grade.</strong>
            <span>They explain why a particular copy stood out during the selection process and help collectors compare individual examples more thoughtfully.</span>
          </div>

          <div className="curator-standard-grid">
            <div className="curator-standard-panel">
              <h3>What We Evaluate</h3>
              <ul>
                <li>Front-to-back wrap and cover centering</li>
                <li>Staple placement and spine alignment</li>
                <li>Printing registration and trim</li>
                <li>Writing, arrival dates, and distributor markings</li>
                <li>Color saturation, gloss, and clean borders</li>
                <li>Overall visual balance and display appeal</li>
              </ul>
            </div>
            <div className="curator-standard-panel">
              <h3>How to Use the Notes</h3>
              <p>CGC assesses technical condition. Curator Notes focus on the manufacturing and presentation traits that help distinguish one certified copy from another.</p>
              <p>Every listing includes high-resolution front-and-back photography so collectors can inspect the exact book and reach their own conclusion.</p>
            </div>
          </div>

          <div className="curator-philosophy">
            <h3>Our Philosophy</h3>
            <p>Mutant Vault is built around selecting the copy—not merely buying the grade. Curator Notes document the characteristics that informed that selection and provide context that a numerical grade alone cannot fully communicate.</p>
          </div>
        </section>
      </div>
    </section>
  );
}
