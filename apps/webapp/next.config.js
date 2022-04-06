// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  useFileSystemPublicRoutes: true,
  assetPrefix: '/',
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/hive': { page: '/hive' }
    }
  },
  // images: {
  //   domains: ['effective-adventure.alexpedersen.dev', 'ipfs-effective-adventure.alexpedersen.dev'],
  //   loader: "imgix",
  //   path: "https://noop/",
  // },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: true,
  },
};

module.exports = withNx(nextConfig);
