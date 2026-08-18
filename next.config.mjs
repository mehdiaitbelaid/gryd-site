/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other lockfiles sit above this folder on the Desktop, so pin the trace root.
  outputFileTracingRoot: import.meta.dirname,
  images: {
    // Sanity serves every asset from this host once real credentials are wired up.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
