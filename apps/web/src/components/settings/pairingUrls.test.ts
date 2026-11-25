import { expect, it } from "vite-plus/test";

import { resolveDesktopPairingUrl } from "./pairingUrls";

it.each(["http://192.168.1.44:3773", "https://host.tailnet.example.ts.net"])(
  "keeps the pairing grant on the selected host %s",
  (origin) => {
    expect(resolveDesktopPairingUrl(origin, "PAIRCODE")).toBe(`${origin}/pair#token=PAIRCODE`);
  },
);
