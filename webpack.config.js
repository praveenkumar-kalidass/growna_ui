const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = (env) => {
  const mode = env.NODE_ENV || "development";

  return {
    entry: {
      app: path.join(__dirname, "src/index.js")
    },
    output: {
      path: path.join(__dirname, "public"),
      hashDigestLength: 10,
      filename: mode === "production" ? "scripts/[name].[hash].bundle.js" :
        "scripts/[name].bundle.js"
    },
    mode,
    resolve: {
      extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: path.join(__dirname, "public/index.html"),
        template: path.join(__dirname, "src/index.html")
      }),
      new webpack.HotModuleReplacementPlugin()
    ].slice(0, (mode === "production" && 2) || 3),
    devServer: {
      contentBase: path.join(__dirname, "public/"),
      historyApiFallback: true,
      hot: true,
      open: true
    },
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            plugins: [
              "transform-object-rest-spread",
              "transform-class-properties",
              "syntax-dynamic-import"
            ],
            presets: [
              "env",
              "react"
            ]
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }, {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: mode === "production" ? "[hash].[ext]" : "[name].[ext]",
            outputPath: "images/"
          }
        }]
      }, {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: [
          "file-loader"
        ]
      }]
    },
    node: {
      net: "mock"
    }
  };
};
