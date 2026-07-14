import inventory from "../../data/inventory.json";
import ComicCard from "../../components/ComicCard";

export const metadata = { title: "Available Inventory" };

export default function InventoryPage() {
  const available = inventory.filter((item) => item.status === "available");
  return (
    <section className="section page-top">
      <div className="shell">
        <div className="page-heading">
          <p className="eyebrow">Available comics</p>
          <h1>Current Inventory</h1>
          <p>Premium graded X-Men and Marvel comics currently available through Mutant Vault.</p>
        </div>
        <div className="card-grid">
          {available.map((comic) => <ComicCard key={comic.slug} comic={comic} />)}
        </div>
      </div>
    </section>
  );
}
