#!/usr/bin/env node
/**
 * Generate all favicon / PWA / home-screen icon assets from source SVGs.
 *
 * Two source SVGs are used:
 *   - midjourney-icon-ios.svg  → the designed iOS-style app tile (dark gradient
 *     body, amber glow, sheen, sailboat mark). This is THE app icon shown on the
 *     iOS Home Screen, the browser tab (favicon) and when the PWA is installed.
 *     Its rounded corners are transparent, so iOS/Android masking renders cleanly.
 *   - icon.svg  → the optimized transparent sailboat mark, preserved for other
 *     purposes where a fully transparent background is ideal (in-app usage).
 *
 * All rasterized PNGs are generated from the iOS tile. Both SVGs are copied into
 * public/icons/ so they can be referenced at runtime.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
// Opaque designed tile — source of truth for all rasterized app icons.
const SVG_PATH = resolve(ROOT, "midjourney-icon-ios.svg");
// Optimized transparent mark — kept for transparent-background use cases.
const SVG_MARK_PATH = resolve(ROOT, "icon.svg");
const ICONS_DIR = resolve(ROOT, "public", "icons");

const svgBuffer = readFileSync(SVG_PATH);

// All required sizes per CLAUDE.md spec
const pngSizes = [
  { name: "icon-1024.png", size: 1024 },
  { name: "icon-512.png", size: 512 },
  { name: "icon-384.png", size: 384 },
  { name: "icon-192.png", size: 192 },
  { name: "icon-144.png", size: 144 },
  { name: "icon-96.png", size: 96 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "apple-touch-icon-180.png", size: 180 },
  { name: "apple-touch-icon-167.png", size: 167 },
  { name: "apple-touch-icon-152.png", size: 152 },
  { name: "apple-touch-icon-120.png", size: 120 },
  { name: "favicon-32.png", size: 32 },
  { name: "favicon-16.png", size: 16 },
];

// Rasterize the 1024px source at 2× (density 192 → ~2048px) so downscaled
// icons stay crisp and the glow filter scales proportionally.
const RENDER_DENSITY = 192;

async function generatePNG(name, size) {
  const output = resolve(ICONS_DIR, name);
  await sharp(svgBuffer, { density: RENDER_DENSITY })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(output);
  console.log(`  ✓ ${name} (${size}×${size})`);
}

async function generateICO() {
  // Generate 16, 32, 48 PNGs for ICO
  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map((s) =>
      sharp(svgBuffer, { density: RENDER_DENSITY })
        .resize(s, s, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer()
    )
  );

  // Build ICO file (simplified ICO format using PNG entries)
  const ico = buildICO(buffers, sizes);
  writeFileSync(resolve(ICONS_DIR, "favicon.ico"), ico);
  writeFileSync(resolve(ROOT, "public", "favicon.ico"), ico);
  console.log("  ✓ favicon.ico (16,32,48 multi-size)");
}

function buildICO(pngBuffers, sizes) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = dirEntrySize * numImages;
  let offset = headerSize + dirSize;

  // ICO header
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(numImages, 4);

  // Directory entries
  const dirEntries = Buffer.alloc(dirSize);
  for (let i = 0; i < numImages; i++) {
    const pos = i * dirEntrySize;
    dirEntries.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], pos); // width
    dirEntries.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], pos + 1); // height
    dirEntries.writeUInt8(0, pos + 2); // color palette
    dirEntries.writeUInt8(0, pos + 3); // reserved
    dirEntries.writeUInt16LE(1, pos + 4); // color planes
    dirEntries.writeUInt16LE(32, pos + 6); // bits per pixel
    dirEntries.writeUInt32LE(pngBuffers[i].length, pos + 8); // size
    dirEntries.writeUInt32LE(offset, pos + 12); // offset
    offset += pngBuffers[i].length;
  }

  return Buffer.concat([header, dirEntries, ...pngBuffers]);
}

async function main() {
  console.log("Generating icons from midjourney-icon-ios.svg...\n");

  // Copy the iOS tile SVG to public/icons (scalable app icon / SVG favicon).
  writeFileSync(resolve(ICONS_DIR, "icon-ios.svg"), readFileSync(SVG_PATH, "utf8"));
  console.log("  ✓ icon-ios.svg (copied to public/icons/)");

  // Keep the optimized transparent mark available for transparent use cases.
  writeFileSync(resolve(ICONS_DIR, "icon.svg"), readFileSync(SVG_MARK_PATH, "utf8"));
  console.log("  ✓ icon.svg (transparent mark copied to public/icons/)");

  // Generate all PNGs
  await Promise.all(pngSizes.map(({ name, size }) => generatePNG(name, size)));

  // Generate ICO
  await generateICO();

  console.log("\nDone! All icons generated in public/icons/");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
