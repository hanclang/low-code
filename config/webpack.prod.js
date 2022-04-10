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
      chunks: "async",
      // all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
      // async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
      // initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包。
      minSize: 1024,               // 文件最小打包体积，单位byte，默认30000
      minChunks: 1,                 // 最少引入的次数  2：引入两次及以上被打包
      automaticNameDelimiter: ".",  // 打包分割符
      cacheGroups: {
        vendors: {
          // 项目基本框架等
          chunks: "all",
          test: /(react|react-dom|react-dom-router)/,
          priority: 100,
          name: "vendors",
        },
      },
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
