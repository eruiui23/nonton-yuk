import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'film-management-api.labse.id',
        port: '',
        pathname: '/api/static/**', 
      },
    ],
  },
};

export default nextConfig;
