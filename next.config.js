

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};
module.exports = { nextConfig };
module.exports = {
    staticPageGenerationTimeout: 1000,
    experimental: {
        missingSuspenseWithCSRBailout: false,
      },
}
