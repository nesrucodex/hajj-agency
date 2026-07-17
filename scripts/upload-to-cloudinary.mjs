/**
 * One-time (idempotent) uploader: pushes every file in public/assets to
 * Cloudinary, keeping the path as the public_id so the delivery URLs match
 * src/lib/media.ts. Re-run any time to sync new/changed media.
 *
 *   node --env-file=.env.local scripts/upload-to-cloudinary.mjs
 *   # or: pnpm run upload:media
 */
import { v2 as cloudinary } from "cloudinary";
import { readdirSync, statSync, existsSync } from "fs";
import { join, relative } from "path";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;
const FOLDER = process.env.CLOUDINARY_FOLDER || "hajj";

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error(
    "Missing Cloudinary env vars. Run with: node --env-file=.env.local scripts/upload-to-cloudinary.mjs",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = "public";
const DIRS = ["assets/image", "assets/video", "assets/video/poster"];
const VIDEO_RE = /\.(mp4|mov|webm|m4v)$/i;

function filesIn(dir) {
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return [];
  return readdirSync(abs)
    .map((name) => join(abs, name))
    .filter((p) => statSync(p).isFile());
}

function uploadLarge(path, options) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(path, options, (err, res) =>
      err ? reject(err) : resolve(res),
    );
  });
}

const files = DIRS.flatMap(filesIn);
console.log(`Uploading ${files.length} files to Cloudinary folder "${FOLDER}"…\n`);

let ok = 0;
let fail = 0;
for (const file of files) {
  const rel = relative(ROOT, file).replace(/\\/g, "/"); // assets/image/1.jpg
  const publicId = `${FOLDER}/${rel.replace(/\.[^.]+$/, "")}`;
  const isVideo = VIDEO_RE.test(file);
  const opts = {
    public_id: publicId,
    resource_type: isVideo ? "video" : "image",
    overwrite: true,
    invalidate: true,
    use_filename: false,
    unique_filename: false,
  };
  try {
    const res = isVideo
      ? await uploadLarge(file, { ...opts, chunk_size: 20_000_000 })
      : await cloudinary.uploader.upload(file, opts);
    ok++;
    console.log(`✓ ${rel}  →  ${res.secure_url}`);
  } catch (e) {
    fail++;
    console.error(`✗ ${rel}: ${e?.message || e}`);
  }
}

console.log(`\nDone. ${ok} uploaded, ${fail} failed.`);
process.exit(fail ? 1 : 0);
