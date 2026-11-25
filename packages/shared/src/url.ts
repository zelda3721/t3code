// `URL.parse` and `URL.canParse` are missing before Safari 17/18, and client code ships unpolyfilled.
export function parseUrl(value: string, base?: string): URL | null {
  try {
    return new URL(value, base);
  } catch {
    return null;
  }
}

/** User content can be shared through a private web origin or an on-device app link. */
export function privateShareOrigin(value?: string): string | undefined {
  const url = value ? parseUrl(value) : null;
  if (!url || (url.protocol !== "https:" && url.protocol !== "http:")) return undefined;
  const host = url.hostname.toLowerCase().replace(/\.$/, "");
  if (host === "t3.codes" || host.endsWith(".t3.codes")) return undefined;
  return url.origin;
}
