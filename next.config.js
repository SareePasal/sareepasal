const withMDX = require('@next/mdx')()

/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};
module.exports = { nextConfig };
module.exports = withMDX({
    staticPageGenerationTimeout: 1000
})
