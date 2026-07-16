import Link from "next/link";
export default function Header() {
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" className="brand-wordmark" aria-label="Mutant Vault home"><span className="brand-monogram">MV</span><span className="brand-copy"><strong>Mutant Vault</strong><small>X-Men & Marvel Comics</small></span></Link>
    <nav className="main-nav"><Link href="/inventory">Inventory</Link><Link href="/sold">Sold Archive</Link><Link href="/about">About</Link><Link href="/shipping">Shipping</Link><Link href="/contact">Contact</Link></nav>
  </div></header>;
}
