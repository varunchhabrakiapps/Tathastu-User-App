/** MM:SS from a countdown in whole seconds (display-only). */
export function formatMmSsCountdown(totalSec: number): string {
  const clamped = Math.max(0, Math.floor(totalSec));
  const m = Math.floor(clamped / 60);
  const s = clamped % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
