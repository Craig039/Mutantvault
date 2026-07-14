export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <img className="footer-mark" src="/brand/mutant-vault-monogram.png" alt="" />
          <p className="footer-title">Mutant Vault</p>
          <p>Curated high-grade X-Men & Marvel comics.</p>
        </div>
        <div>
          <p className="eyebrow">Find us</p>
          <a href="https://instagram.com/mutantvault" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.ebay.com/" target="_blank" rel="noreferrer">eBay Store</a>
          <a href="mailto:info@mutantvault.com">Email</a>
        </div>
      </div>
      <div className="shell footer-bottom">© 2026 Mutant Vault. All rights reserved.</div>
    </footer>
  );
}
