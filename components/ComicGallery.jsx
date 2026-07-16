"use client";

import { useEffect, useMemo, useState } from "react";

export default function ComicGallery({ title, images = [] }) {
  const cleanImages = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState({ visible: false, x: 50, y: 50 });
  const [lightbox, setLightbox] = useState(false);

  const activeImage = cleanImages[activeIndex];

  useEffect(() => {
    function onKeyDown(event) {
      if (!lightbox) return;
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % cleanImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex(
          (current) => (current - 1 + cleanImages.length) % cleanImages.length
        );
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightbox, cleanImages.length]);

  function updateZoom(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoom({ visible: true, x, y });
  }

  if (!activeImage) {
    return (
      <div className="detail-image-placeholder">
        <strong>{title}</strong>
        <span>Photos coming soon</span>
      </div>
    );
  }

  return (
    <div className="comic-gallery">
      <button
        type="button"
        className="gallery-main"
        onMouseMove={updateZoom}
        onMouseEnter={updateZoom}
        onMouseLeave={() => setZoom((current) => ({ ...current, visible: false }))}
        onClick={() => setLightbox(true)}
        aria-label={`Open full-size image of ${title}`}
      >
        <img src={activeImage} alt={`${title} image ${activeIndex + 1}`} />
        <span className="zoom-hint">Hover to magnify · Click for full screen</span>

        {zoom.visible && (
          <span
            className="magnifier-lens"
            aria-hidden="true"
            style={{
              left: `${zoom.x}%`,
              top: `${zoom.y}%`,
              backgroundImage: `url("${activeImage}")`,
              backgroundPosition: `${zoom.x}% ${zoom.y}%`,
            }}
          />
        )}
      </button>

      {cleanImages.length > 1 && (
        <div className="gallery-thumbnails" aria-label={`${title} image gallery`}>
          {cleanImages.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={index === activeIndex ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`View image ${index + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}

      {lightbox && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`}>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightbox(false)}
            aria-label="Close image viewer"
          >
            ×
          </button>

          {cleanImages.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-prev"
              onClick={() =>
                setActiveIndex(
                  (current) =>
                    (current - 1 + cleanImages.length) % cleanImages.length
                )
              }
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          <img src={activeImage} alt={`${title} full-size image`} />

          {cleanImages.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={() =>
                setActiveIndex((current) => (current + 1) % cleanImages.length)
              }
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </div>
      )}
    </div>
  );
}
