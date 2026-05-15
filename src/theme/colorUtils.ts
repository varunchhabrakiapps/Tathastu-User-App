/** Convert `#RRGGBB` to `rgba(r,g,b,a)` for gradients (design tokens only). */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function parseRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

/** Linear blend of two `#RRGGBB` colours, `t ∈ [0,1]` → `a` at 0, `b` at 1. */
export function mixHex(a: string, b: string, t: number): string {
  const A = parseRgb(a);
  const B = parseRgb(b);
  const u = Math.max(0, Math.min(1, t));
  const r = Math.round(A.r + (B.r - A.r) * u);
  const g = Math.round(A.g + (B.g - A.g) * u);
  const bl = Math.round(A.b + (B.b - A.b) * u);
  return `#${[r, g, bl].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
}
