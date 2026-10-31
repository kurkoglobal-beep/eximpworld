import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Let proxy combine slash normalization and legacy-language redirects.
  skipTrailingSlashRedirect: true,
  // Preserve the request origin during rewrites, including local IP hosts.
  skipProxyUrlNormalize: true,
};

export default nextConfig;
