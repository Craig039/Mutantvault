import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand-lockup" aria-label="Mutant Vault home">
          <img src="/brand/mutant-vault-header.png" alt="Mutant Vault" />
        </Link>
        <nav className="main-nav" aria-label="Primary navigation">
          <Link href="/">Home</Link>
          <Link href="/inventory">Inventory</Link>
          <Link href="/sold">Sold Archive</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
