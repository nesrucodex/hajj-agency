/**
 * Resolves media (image + video) paths to their hosted URLs so the heavy files
 * live off-repo on Cloudinary.
 *
 * Files are uploaded to Cloudinary keeping their path as the public_id, e.g.
 *   public/assets/image/1.jpg   -> <cloud>/image/upload/<folder>/assets/image/1.jpg
 *   public/assets/video/hero.mp4 -> <cloud>/video/upload/<folder>/assets/video/hero.mp4
 *
 * The cloud name + folder are public (they appear in every delivery URL), so
 * they are safe defaults here; override with NEXT_PUBLIC_* env vars if needed.
 * Set NEXT_PUBLIC_MEDIA_LOCAL=true to serve from /public during local dev.
 * A path that is already an absolute http(s) URL is returned unchanged.
 */
const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dlmkdgi9v";
const FOLDER = (process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "hajj").replace(
  /^\/+|\/+$/g,
  "",
);
const USE_LOCAL = process.env.NEXT_PUBLIC_MEDIA_LOCAL === "true";

const VIDEO_RE = /\.(mp4|mov|webm|m4v)$/i;

export function mediaUrl(path?: string): string | undefined {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  if (USE_LOCAL || !CLOUD_NAME) return path;
  const clean = path.replace(/^\/+/, ""); // assets/image/1.jpg
  const type = VIDEO_RE.test(clean) ? "video" : "image";
  return `https://res.cloudinary.com/${CLOUD_NAME}/${type}/upload/${FOLDER}/${clean}`;
}

export { CLOUD_NAME, FOLDER };
