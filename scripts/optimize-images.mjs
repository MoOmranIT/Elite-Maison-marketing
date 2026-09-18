#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const images = join(root, "public", "assets", "images");
const source = join(images, "elite-architecture.png");
const logo = join(images, "logo-mark.png");
mkdirSync(images, { recursive: true });

const sourceMeta = await sharp(source).metadata();
const heroWebp = join(images, "elite-architecture.webp");
const heroAvif = join(images, "elite-architecture.avif");
await sharp(source).webp({ quality: 84, effort: 6 }).toFile(heroWebp);
await sharp(source).avif({ quality: 58, effort: 6 }).toFile(heroAvif);

const favicon32 = join(images, "favicon-32.png");
const favicon48 = join(images, "favicon-48.png");
const apple = join(images, "apple-touch-icon.png");
await sharp(logo).resize(32, 32, { fit: "contain" }).png({ compressionLevel: 9, palette: true }).toFile(favicon32);
await sharp(logo).resize(48, 48, { fit: "contain" }).png({ compressionLevel: 9, palette: true }).toFile(favicon48);
await sharp(logo).resize(180, 180, { fit: "contain" }).png({ compressionLevel: 9, palette: true }).toFile(apple);

const entries = async (file) => {
  const meta = await sharp(file).metadata();
  return { file: file.replace(`${images}\\`, "").replaceAll("\\", "/"), bytes: readFileSync(file).byteLength, width: meta.width, height: meta.height, format: meta.format };
};
const report = {
  source: await entries(source),
  production: [await entries(heroWebp), await entries(heroAvif)],
  favicon: [await entries(favicon32), await entries(favicon48), await entries(apple)]
};
writeFileSync(join(root, ".image-optimization-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify(report, null, 2));
