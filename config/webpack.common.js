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
