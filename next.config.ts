// DO NOT import `NextConfig` from "next" — just define the type inline or let it infer

const nextConfig = {
  experimental: {
    // This is available in Next.js 14.0+, and works in 15.x
    serverActions: {},
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during build
  },
};

export default nextConfig;
