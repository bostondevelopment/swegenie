import { defineConfig } from "vitest/config";
import path from "path";

/**
 * Separate config for the *.report.ts files — on-demand, human-readable
 * impact/drift reports (see npm run personas:report/snapshot and
 * corpus:report/snapshot), not part of the normal `npm test` run. The
 * default vitest config only picks up `*.test.ts` files; this override's
 * `include` targets report files directly instead, since they aren't (and
 * shouldn't be) named to match the default test glob.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["lib/*.report.ts"],
  },
});
