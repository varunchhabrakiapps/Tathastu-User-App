/** Extract numeric amount from glance strings like `From ₹5,800`. */
export function parsePriceAmount(priceGlance: string): number {
  const digits = priceGlance.replace(/[^\d]/g, '');
  if (!digits) return 0;
  return Number.parseInt(digits, 10);
}
