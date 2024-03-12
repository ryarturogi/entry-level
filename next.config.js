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
      'claggldspplsjasuzzze.supabase.co',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      enforce: 'pre',
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
