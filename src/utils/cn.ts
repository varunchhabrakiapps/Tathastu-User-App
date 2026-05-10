/** Join Tailwind-style class fragments; skips falsy segments. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
