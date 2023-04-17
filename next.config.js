const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    concurrentFeatures: false,
    serverComponents: true,
  },
  poweredByHeader: false,
  images: {
    loader: "default",
    domains: [
      "localhost",
      "0.0.0.0",
      "cmsmediaproduction.s3.amazonaws.com",
      "cmsmediastaging.s3.amazonaws.com",
      "avatars.githubusercontent.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  staticPageGenerationTimeout: 120,
  sentry: {
    hideSourceMaps: true,
  },
  async redirects() {
    return [
      {
        source: "/swap",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/manifest.json",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/(.*)?",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=600, stale-while-revalidate=120",
          },
        ],
      },
    ];
  },
};

const sentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
