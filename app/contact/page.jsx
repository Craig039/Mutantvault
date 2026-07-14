export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="section page-top">
      <div className="shell narrow">
        <p className="eyebrow">Contact</p>
        <h1>Inquire about a book.</h1>
        <p className="lead">
          Reach out through Instagram, eBay, or email for availability, bundles, and direct-sale questions.
        </p>
        <div className="contact-grid">
          <a className="contact-card" href="https://instagram.com/mutantvault" target="_blank" rel="noreferrer">
            <strong>Instagram</strong>
            <span>@mutantvault</span>
          </a>
          <a className="contact-card" href="https://www.ebay.com/" target="_blank" rel="noreferrer">
            <strong>eBay Store</strong>
            <span>Mutant Vault Comics</span>
          </a>
          <a className="contact-card" href="mailto:info@mutantvault.com">
            <strong>Email</strong>
            <span>info@mutantvault.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
