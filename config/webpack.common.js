const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const WebpackBar = require("webpackbar");
const path = require("path");
const { isDevelopment, isProduction } = require("./env");
const { PROJECT_PATH } = require("./constant");

// 因为后续要配sass和less也需要使用到这套规则，所以这里抽离出来
const getCssLoaders = () => [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
      },
    },
  },
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [
          isProduction && [
            "postcss-preset-env",
            {
              autoprefixer: {
                grid: true,
              },
            },
          ],
        ],
      },
    },
  },
];

module.exports = {
  entry: path.resolve(PROJECT_PATH, "./src/index.tsx"),
  resolve: {
    alias: {
      src: path.resolve(PROJECT_PATH, "./src"),
      components: path.resolve(PROJECT_PATH, "./src/components"),
      utils: path.resolve(PROJECT_PATH, "./src/utils"),
    },
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  cache: {
    type: "filesystem",
    buildDependencies: {
      config: [__filename],
    },
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /src/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [...getCssLoaders()],
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          {
            loader: "less-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "async",
      // all: 不管文件是动态还是非动态载入，统一将文件分离。当页面首次载入会引入所有的包
      // async： 将异步加载的文件分离，首次一般不引入，到需要异步引入的组件才会引入。
      // initial：将异步和非异步的文件分离，如果一个文件被异步引入也被非异步引入，那它会被打包两次（注意和all区别），用于分离页面首次需要加载的包。
      minSize: 30000,               // 文件最小打包体积，单位byte，默认30000
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
  },
  plugins: [
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, "./public/index.html"),
    }),
    new WebpackBar({
      name: "compiled start !!!",
      color: "#52c41a",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(PROJECT_PATH, "./public/"),
          to: path.resolve(PROJECT_PATH, "./dist/"),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"], // **表示任意目录下
          },
        },
      ],
    }),
  ],
};
