import Link from "next/link";

export default function NewArrivals({ comics }) {
  return (
    <section className="arrival-strip" aria-labelledby="new-arrivals-heading">
      <div className="shell">
        <div className="arrival-heading">
          <div>
            <p className="eyebrow">Fresh from the vault</p>
            <h2 id="new-arrivals-heading">New Arrivals</h2>
          </div>
          <Link href="/inventory" className="text-link">
            View all inventory
          </Link>
        </div>

        <div className="arrival-grid">
          {comics.map((comic) => {
            const image = comic.images?.[0];
            return (
              <Link
                key={comic.slug}
                href={`/inventory/${comic.slug}`}
                className="arrival-card"
              >
                <div className="arrival-image">
                  {image ? (
                    <img src={image} alt={`${comic.title} front cover`} />
                  ) : (
                    <span>{comic.title}</span>
                  )}
                </div>
                <div>
                  <strong>{comic.title}</strong>
                  <span>{comic.grade}</span>
                  <em>{comic.price}</em>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
