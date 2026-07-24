export function imageSource(image, kind = "display") {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image[kind] || image.display || image.full || image.thumb || "";
}

export function imageAlt(image, fallback = "Comic image") {
  return typeof image === "object" && image?.alt ? image.alt : fallback;
}
