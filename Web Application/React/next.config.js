const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          process: require.resolve("process/browser"),
          // ajoutez d'autres polyfills si nécessaire
        };
      }
      return config;
    },
  };
  
  module.exports = nextConfig;
  