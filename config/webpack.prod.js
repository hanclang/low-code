const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const { PROJECT_PATH } = require("./constant");
const common = require("./webpack.common");

module.exports = merge(common, {
  target: "browserslist",
  mode: "production",
  devtool: false,
  output: {
    filename: "js/[name].[contenthash:8].js",
    path: path.resolve(PROJECT_PATH, "./dist"),
    assetModuleFilename: "images/[name].[contenthash:8].[ext]",
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "all",
      minSize: 1024,
    },
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ["console.log"] },
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
});
