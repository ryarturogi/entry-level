module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'remoteok.com',
      'remotive.com',
      'remoteok.io',
      'assets.landing.jobs',
      'lh3.googleusercontent.com',
    ],
  },
};
