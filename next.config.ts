import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: '/about',              destination: '/screens/about' },
      { source: '/choral-directing',   destination: '/screens/choral-directing' },
      { source: '/vocalist',           destination: '/screens/vocalist' },
      { source: '/compositions',       destination: '/screens/compositions' },
      { source: '/compositions/:id',   destination: '/screens/compositions/:id' },
      { source: '/arrangements',       destination: '/screens/arrangements' },
      { source: '/arrangements/:id',   destination: '/screens/arrangements/:id' },
      { source: '/contact',            destination: '/screens/contact' },
    ];
  },
};

export default nextConfig;
