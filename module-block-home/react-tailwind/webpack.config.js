const path = require("path");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3004,
    headers: {
      "Access-Control-Allow-Origin": "*", // Autorise les requêtes de toutes les origines
    },
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "module_home_welcome",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/app.jsx",
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
};
