#!/usr/bin/env node
/**
 * Generate all PWA icon assets from source SVG.
 * Preserves transparency for iOS adaptive light/dark tinting.
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SVG_PATH = resolve(ROOT, "icon.svg");
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

async function generatePNG(name, size) {
  const output = resolve(ICONS_DIR, name);
  // Use density 72 to keep rasterized SVG within pixel limits, then resize
  await sharp(svgBuffer, { density: 72 })
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
      sharp(svgBuffer, { density: 72 })
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
  console.log("Generating icons from icon.svg...\n");

  // Copy SVG to public/icons as well
  const svgContent = readFileSync(SVG_PATH, "utf8");
  writeFileSync(resolve(ICONS_DIR, "icon.svg"), svgContent);
  console.log("  ✓ icon.svg (copied to public/icons/)");

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
