const path = require("path");

module.exports = function(api) {
  api.cache(false);

  const config = {
    exclude: [/node_modules\/.*/],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          targets: {
            browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }
      ]
    ],
    plugins: [
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-transform-for-of",
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false
        }
      ],
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              targets: {
                node: 'current',
              },
            },
          ],
        ],
        plugins: [
          "transform-es2015-modules-commonjs",
        ]
      }
    }
  };

  if (process.env.NODE_ENV === 'test') {
    Object.assign(config, { exclude: [] })
  }

  return config;
};
