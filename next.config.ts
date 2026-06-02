import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPages =
  process.env.GITHUB_ACTIONS === "true" &&
  repoName !== undefined &&
  !repoName.endsWith(".github.io");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
