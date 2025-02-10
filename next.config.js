const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'localhost',
      'assets.landing.jobs',
      'avatars.githubusercontent.com',
      'remoteok.com',
      'remotive.com',
      'remoteok.io',
      'lh3.googleusercontent.com',
      'via.placeholder.com',
      'assets.landing.jobs',
      'psvngtwthlprdfbaauyh.supabase.co',
    ],
  },
  webpack: (config, { isServer }) => {
    // Client-side fallback
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // This tells webpack to ignore the fs module on the client-side
      };
    }

    // Existing webpack rule for SVGs
    config.module.rules.push({
      test: /\.svg$/i,
      enforce: 'pre',
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
