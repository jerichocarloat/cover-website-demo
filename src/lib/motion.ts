/** CSS compilers can rewrite 560ms to .56s; WAAPI always expects milliseconds. */
export function cssTimeMs(value: string, fallback: number): number {
  const time = value.trim();
  if (!/^(?:\d+(?:\.\d+)?|\.\d+)(?:ms|s)$/.test(time)) return fallback;
  const amount = Number.parseFloat(time);
  return time.endsWith("ms") ? amount : amount * 1000;
}
