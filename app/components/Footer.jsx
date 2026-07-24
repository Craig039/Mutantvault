import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-monogram">MV</span>
            <strong>Mutant Vault</strong>
          </div>
          <p>
            Collector-owned CGC-certified X-Men and Marvel comics, photographed
            individually and shipped fully insured.
          </p>
          <p className="footer-question">
            Questions? <Link href="/contact">Contact us before you buy</Link>.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <Link href="/inventory">Inventory</Link>
          <Link href="/sold">Sold Archive</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <a href="https://instagram.com/mutantvault">Instagram</a>
          <a href="mailto:info@mutantvault.com">Email</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        © 2026 Mutant Vault. All rights reserved.
      </div>
    </footer>
  );
}
