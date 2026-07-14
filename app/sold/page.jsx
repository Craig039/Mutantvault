import inventory from "../../data/inventory.json";
import ComicCard from "../../components/ComicCard";

export const metadata = { title: "Sold Archive" };

export default function SoldPage() {
  const sold = inventory.filter((item) => item.status === "sold");
  return (
    <section className="section page-top">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Past offerings</p>
          <h1>Sold Archive</h1>
          <p>A record of books previously offered through Mutant Vault.</p>
        </div>
        <div className="card-grid">
          {sold.map((comic) => <ComicCard key={comic.slug} comic={comic} />)}
        </div>
      </div>
    </section>
  );
}
