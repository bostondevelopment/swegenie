import { defineConfig } from "vitest/config";
import path from "path";

/**
 * Separate config for lib/personas.report.ts — an on-demand, human-readable
 * impact report (see npm run personas:report / personas:snapshot), not part
 * of the normal `npm test` run. The default vitest config only picks up
 * `*.test.ts` files; this override's `include` targets the report file
 * directly instead, since it isn't (and shouldn't be) named to match the
 * default test glob.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["lib/personas.report.ts"],
  },
});
