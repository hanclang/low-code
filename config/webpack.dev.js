const { merge } = require("webpack-merge");
const path = require("path");
const webpack = require("webpack");
const { PROJECT_PATH } = require("./constant");
const common = require("./webpack.common");

module.exports = merge(common, {
  target: "web",
  mode: "development",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].js",
    path: path.resolve(PROJECT_PATH, "./dist"),
  },
  devServer: {
    port: 3000,
    compress: true,
    open: true,
    hot: true,
    client: {
      progress: true,
    },
  },
  plugins: [
    // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
    // new webpack.HotModuleReplacementPlugin(),
  ],
});
