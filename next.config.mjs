/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["pdf-parse"], // ✅ correct key

  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false
    };
    return config;
  }
};

export default nextConfig;
