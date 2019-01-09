const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");
const atImport = require("postcss-import");
const postCssNormalize = require("postcss-normalize");
const postcssMixins = require("postcss-mixins");
const postcssNested = require("postcss-nested");
const postcssPresetEnv = require("postcss-preset-env");
const responsiveType = require("postcss-responsive-type");
const fontMagician = require("postcss-font-magician");

const cssFilename = "[name].[contenthash:8].css";

const SRC_PATH = path.join(__dirname, "../src");

module.exports = {
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [SRC_PATH],
        use: [
          {
            loader: "awesome-typescript-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        include: [SRC_PATH],
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: require.resolve('typings-for-css-modules-loader'),
              options: {
                minimize: true || {},
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                namedExport: true
              }
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                ident: "postcss",
                plugins: () => [
                  atImport,
                  require("postcss-flexbugs-fixes"),
                  autoprefixer({
                    browsers: [
                      ">1%",
                      "last 4 versions",
                      "Firefox ESR",
                      "not ie < 9" // React doesn't support IE8 anyway
                    ],
                    flexbox: "no-2009"
                  }),
                  responsiveType,
                  postcssNested,
                  postcssMixins,
                  postCssNormalize({
                    browsers: "last 3 versions"
                  }),
                  fontMagician({
                    variants: {
                      "Open Sans": {
                        "300": ["woff, eot, woff2"],
                        "400 italic": ["woff2"],
                        "700": []
                      }
                    },
                    foundries: ["google"]
                  }),
                  postcssPresetEnv({
                    features: {
                      "custom-selectors": true,
                      "custom-properties": true,
                      "custom-media-queries": true,
                      "media-query-ranges": true,
                      "hexadecimal-alpha-notation": true,
                      "image-set-function": true,
                      "logical-properties-and-values": true,
                      "color-mod-function": true,
                      "postcss-media-minmax": true
                    }
                  })
                ],
                sourceMap: true
              }
            }
          ],
          fallback: "file-loader"
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: cssFilename
    })
  ]
};
