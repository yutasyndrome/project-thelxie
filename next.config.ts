import type { NextConfig } from 'next';

const isOpenNextBuild = process.env.OPENNEXT === '1';

const nextConfig: NextConfig = {
  output: isOpenNextBuild ? 'standalone' : 'export',
};

export default nextConfig;
