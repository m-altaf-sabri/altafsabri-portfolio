
/** @type {import('next').NextConfig} */
import path from "node:path";

const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  turbopack: {
    root: path.resolve(process.cwd()),

    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

