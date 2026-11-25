import { afterEach, expect, it, vi } from "vite-plus/test";

// Keep config parsing independent of local env files and build credentials.
vi.mock("../../scripts/lib/public-config.ts", () => ({
  loadRepoEnv: () => ({
    APP_VARIANT: process.env.APP_VARIANT,
    T3CODE_RELAY_URL: "https://relay.example.test",
    T3CODE_MOBILE_UPDATES_ENABLED: "1",
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test",
    EXPO_PUBLIC_OTLP_TRACES_TOKEN: "trace-test",
  }),
}));

afterEach(() => {
  vi.unstubAllEnvs();
});

async function loadConfig(variant: string | undefined) {
  vi.resetModules();
  vi.stubEnv("APP_VARIANT", variant);
  return (await import("./app.config.ts")).default;
}

it.each(["prod", ""])("rejects APP_VARIANT=%j before selecting production IDs", async (value) => {
  await expect(loadConfig(value)).rejects.toThrow(
    "APP_VARIANT must be development, preview, or production.",
  );
});

it.each([
  [undefined, "com.t3tools.t3code"],
  ["development", "com.t3tools.t3code.dev"],
  ["preview", "com.t3tools.t3code.preview"],
  ["production", "com.t3tools.t3code"],
])(
  "uses a private iOS identity and disables upstream services for %j",
  async (value, identifier) => {
    const config = await loadConfig(value);
    expect(config.ios?.bundleIdentifier).toBe(
      identifier.replace("com.t3tools.t3code", "dev.zelda3721.t3code.private"),
    );
    expect(config.android?.package).toBe(identifier);
    expect(config.updates).toEqual({ enabled: false, checkAutomatically: "NEVER" });
    expect(config.plugins).toContainEqual([
      "expo-notifications",
      expect.objectContaining({ enableRemoteNotifications: false }),
    ]);
    expect(config.ios?.associatedDomains).toBeUndefined();
    expect(config.android?.intentFilters).toBeUndefined();
    for (const key of ["clerk", "relay", "observability", "eas"]) {
      expect(config.extra).not.toHaveProperty(key);
    }
  },
);
