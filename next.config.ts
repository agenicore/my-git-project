import type { NextConfig } from 'next';
const config: NextConfig = {
  // Keep validation builds separate from a running development server.
  distDir: process.env.CAJ_BUILD_CHECK === '1' ? '.next-check' : '.next',
};
export default config;
