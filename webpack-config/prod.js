const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const DIRNAME = "./";

module.exports = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      https: require.resolve("https-browserify"),
      http: require.resolve("http-browserify"),
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(DIRNAME, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(DIRNAME, "../"),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./manifest.json", to: "manifest.json" },
        { from: "./images/kirbymad.png", to: "kirbymad.png" },
      ],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
};
