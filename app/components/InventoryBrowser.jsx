"use client";

import { useMemo, useState } from "react";
import ComicCard from "./ComicCard";

const numericGrade = (grade = "") => {
  const match = String(grade).match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const priceValue = (comic, fallback) =>
  typeof comic.numericPrice === "number" ? comic.numericPrice : fallback;

const normalizeSearch = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/#/g, "")
    .replace(/[-–—_]/g, " ")
    .replace(/[^a-z0-9.\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const compactSearch = (value = "") => normalizeSearch(value).replace(/\s+/g, "");

export default function InventoryBrowser({ comics }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("issue-low");
  const [grade, setGrade] = useState("all");
  const [price, setPrice] = useState("all");
  const [status, setStatus] = useState("all");

  const gradeOptions = useMemo(
    () =>
      [...new Set(comics.map((comic) => comic.grade).filter(Boolean))].sort(
        (a, b) => numericGrade(b) - numericGrade(a)
      ),
    [comics]
  );

  const filtered = useMemo(() => {
    const term = normalizeSearch(q);
    const compactTerm = compactSearch(q);
    const exactIssue = /^0*\d+$/.test(compactTerm)
      ? Number(compactTerm)
      : null;

    const rows = comics.filter((comic) => {
      const searchText = normalizeSearch([
        comic.title,
        comic.issue,
        comic.grade,
        comic.pages,
        comic.keyDetails,
        comic.credits,
        comic.publisher,
        ...(comic.curatorNotes || []),
        comic.curatorsPick ? "curators pick" : "",
        ...(comic.cardChips || []),
      ].join(" "));
      const compactText = compactSearch(searchText);

      const matchesSearch =
        !term ||
        (exactIssue !== null
          ? Number(comic.issue) === exactIssue
          : searchText.includes(term) || compactText.includes(compactTerm));
      const matchesGrade = grade === "all" || comic.grade === grade;
      const matchesStatus = status === "all" || comic.status === status;

      let matchesPrice = true;
      if (price === "priced") matchesPrice = typeof comic.numericPrice === "number";
      if (price === "pending") matchesPrice = typeof comic.numericPrice !== "number";
      if (price === "under-1000")
        matchesPrice =
          typeof comic.numericPrice === "number" && comic.numericPrice < 1000;
      if (price === "1000-plus")
        matchesPrice =
          typeof comic.numericPrice === "number" && comic.numericPrice >= 1000;

      return matchesSearch && matchesGrade && matchesStatus && matchesPrice;
    });

    return [...rows].sort((a, b) => {
      // When the visitor enters only an issue number, place that exact issue first.
      if (exactIssue !== null) {
        const aExact = Number(a.issue) === exactIssue ? 1 : 0;
        const bExact = Number(b.issue) === exactIssue ? 1 : 0;
        if (aExact !== bExact) return bExact - aExact;
      }

      if (sort === "issue-high") return (b.issue || 0) - (a.issue || 0);
      if (sort === "newest")
        return (b.arrivalOrder || 0) - (a.arrivalOrder || 0);
      if (sort === "price-low")
        return priceValue(a, Number.POSITIVE_INFINITY) - priceValue(b, Number.POSITIVE_INFINITY);
      if (sort === "price-high")
        return priceValue(b, Number.NEGATIVE_INFINITY) - priceValue(a, Number.NEGATIVE_INFINITY);
      if (sort === "grade-high") return numericGrade(b.grade) - numericGrade(a.grade);
      return (a.issue || 0) - (b.issue || 0);
    });
  }, [comics, q, sort, grade, price, status]);

  return (
    <>
      <div className="inventory-tools">
        <label className="inventory-search">
          <span className="sr-only">Search inventory</span>
          <input
            value={q}
            onChange={(event) => setQ(event.target.value)}
            placeholder="Search 4, X-Men 4, grade, artist, or key detail"
          />
        </label>

        <label>
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="issue-low">Issue: low to high</option>
            <option value="issue-high">Issue: high to low</option>
            <option value="newest">Newest added</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="grade-high">Grade: high to low</option>
          </select>
        </label>

        <label>
          <span>Grade</span>
          <select value={grade} onChange={(event) => setGrade(event.target.value)}>
            <option value="all">All grades</option>
            {gradeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Price</span>
          <select value={price} onChange={(event) => setPrice(event.target.value)}>
            <option value="all">All prices</option>
            <option value="priced">Priced books</option>
            <option value="pending">Price pending</option>
            <option value="under-1000">Under $1,000</option>
            <option value="1000-plus">$1,000 and up</option>
          </select>
        </label>

        <label>
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="all">All statuses</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
          </select>
        </label>
      </div>

      <div className="inventory-results-bar">
        <strong>{filtered.length}</strong> {filtered.length === 1 ? "book" : "books"}
      </div>

      <div className="card-grid">
        {filtered.map((comic) => (
          <ComicCard key={comic.slug} comic={comic} />
        ))}
      </div>

      {!filtered.length && (
        <p className="empty-state">No comics match those filters.</p>
      )}
    </>
  );
}
