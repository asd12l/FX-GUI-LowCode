/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-07-21 09:10:07
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-11-23 10:52:10
 */
const base = require("./webpack.config.base");
const merge = require("webpack-merge");
const webpack = require("webpack");

module.exports = merge(base, {
  devServer: {
    port: 9529,
    open: true,
    hot: true,
    // proxy: {
    //   "/xks": {
    //     target: "",
    //     pathRewrite: { "^/xks": "" },
    //     changeOrigin: true,
    //   },
    //   "/mdy": {
    //     target: "",
    //     pathRewrite: { "^/mdy": "" },
    //     changeOrigin: true,
    //   },
    //   "/api": {
    //     target: "",
    //     pathRewrite: { "^/api": "" },
    //     changeOrigin: true,
    //   },
    // },
  },
  module: {
    rules: [
      //   {
      //     test: /\.html$/,
      //     loader: "raw-loader",
      //   },
    ],
  },
  // devtool: "cheap-module-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
});