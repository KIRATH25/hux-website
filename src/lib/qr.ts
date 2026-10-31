import QRCode from "qrcode";

const CHARCOAL = "#171717";
const IVORY = "#F7F5EF";
const SUNFLOWER = "#F4D35E";

/**
 * A QR code as an inline SVG string: charcoal on ivory, error correction H (30% may be covered),
 * with the HUX hexagon in the middle on a charcoal tile. Made at build time, so no QR library ships to the browser.
 */
export async function qrSvg(text: string): Promise<string> {
  const qr = QRCode.create(text, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const data = qr.modules.data;
  const quiet = 4;
  const size = n + quiet * 2;

  // the logo covers about 22% of the width (well under what level H can recover)
  const logo = Math.round(n * 0.22) | 1;
  const lo = Math.floor((n - logo) / 2);
  const hi = lo + logo;
  const inLogo = (x: number, y: number) => x >= lo - 1 && x <= hi && y >= lo - 1 && y <= hi;

  // one path, row by row, merging runs of dark modules
  let d = "";
  for (let y = 0; y < n; y++) {
    let x = 0;
    while (x < n) {
      if (data[y * n + x] && !inLogo(x, y)) {
        const start = x;
        while (x < n && data[y * n + x] && !inLogo(x, y)) x++;
        d += `M${start + quiet} ${y + quiet}h${x - start}v1h-${x - start}z`;
      } else x++;
    }
  }

  const c = quiet + n / 2;
  const r = logo * 0.42; // hexagon radius
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(c + r * Math.cos(a)).toFixed(3)},${(c + r * Math.sin(a)).toFixed(3)}`;
  }).join(" ");
  const tile = logo + 1;
  const t0 = quiet + lo - 0.5;

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="crispEdges" role="img" aria-label="QR code to the HUX download page">`,
    `<rect width="${size}" height="${size}" fill="${IVORY}"/>`,
    `<path d="${d}" fill="${CHARCOAL}"/>`,
    `<g shape-rendering="geometricPrecision">`,
    `<rect x="${t0}" y="${t0}" width="${tile}" height="${tile}" rx="${tile * 0.22}" fill="${CHARCOAL}"/>`,
    `<polygon points="${hex}" fill="none" stroke="${SUNFLOWER}" stroke-width="${(logo * 0.09).toFixed(3)}" stroke-linejoin="round"/>`,
    `</g></svg>`,
  ].join("");
}
