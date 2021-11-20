const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = {
  entry: [`${__dirname}/src/style.scss`],
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production",
  plugins: [
    new FixStyleOnlyEntriesPlugin({ extensions: ["scss"] }),
    new HtmlWebpackPlugin({
      title: "Three column layout",
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/img",
          to: path.resolve(__dirname, "dist/img"),
        },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dev"),
    },
    compress: true,
    port: 9000,
  },
};
