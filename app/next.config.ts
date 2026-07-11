import type { NextConfig } from "next";
import path from "path";

// GitHub Pages serves project sites from a /<repo-name> subpath, so every
// asset/link needs that prefix. NEXT_BASE_PATH is set by the deploy workflow
// (.github/workflows/deploy.yml) from the actual repo name at build time;
// it's empty for local dev/build so `npm run dev`/`npm run build` still work
// against plain "/" like before.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Emits /page/index.html instead of /page.html — the directory-index form
  // every static host, including GitHub Pages, resolves without any
  // server-side rewrite rules (see docs/deploy.md).
  trailingSlash: true,
  basePath,
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
