import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

mkdirSync("d:/projects/EliteMaison/assets/css", { recursive: true });
mkdirSync("d:/projects/EliteMaison/assets/js", { recursive: true });
mkdirSync("d:/projects/EliteMaison/assets/images", { recursive: true });

const html = readFileSync("d:/projects/EliteMaison/index.html", "utf8");
const re = /src="(data:image\/png;base64,[^"]+)"/g;
let match;
let i = 0;
while ((match = re.exec(html)) && i < 4) {
  const buf = Buffer.from(match[1].split(",")[1], "base64");
  const name = i === 0 ? "logo-mark.png" : `logo-${i}.png`;
  writeFileSync(`d:/projects/EliteMaison/assets/images/${name}`, buf);
  console.log(name, buf.length);
  i += 1;
}

const fav = html.match(/rel="icon"[^>]*href="(data:image\/png;base64,[^"]+)"/);
if (fav) {
  const buf = Buffer.from(fav[1].split(",")[1], "base64");
  writeFileSync("d:/projects/EliteMaison/assets/images/favicon.png", buf);
  console.log("favicon.png", buf.length);
}
