const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'assets.landing.jobs',
      'avatars.githubusercontent.com',
      'remoteok.com',
      'remotive.com',
      'remoteok.io',
      'lh3.googleusercontent.com',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
