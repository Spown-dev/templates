const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ManifestPlugin = require("./manifest-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3002,
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
      {
        test: /\.json$/,
        type: "json",
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "icons/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/icons"), // Source des SVG
          to: path.resolve(__dirname, "dist/icons"),
        },
      ],
    }),
    new ModuleFederationPlugin({
      name: "module_leadboard",
      filename: "remoteEntry.js",
      exposes: {
        "./app": "./src/app.jsx",
        "./translations": "./src/translations/index.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: require("./package.json").dependencies.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: require("./package.json").dependencies["react-dom"],
        },
        "react-i18next": {
          singleton: true,
          requiredVersion:
            require("./package.json").dependencies["react-i18next"],
        },
        i18next: {
          singleton: true,
          requiredVersion: require("./package.json").dependencies["i18next"],
        },
      },
    }),
    new ManifestPlugin(),
  ],
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
};
