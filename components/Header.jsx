import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand-wordmark" aria-label="Mutant Vault home">
          <span className="brand-monogram" aria-hidden="true">MV</span>
          <span className="brand-copy">
            <strong>Mutant Vault</strong>
            <small>X-Men &amp; Marvel Comics</small>
          </span>
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link><Link href="/inventory">Inventory</Link><Link href="/sold">Sold Archive</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
