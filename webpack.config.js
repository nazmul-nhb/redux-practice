const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 4242,
    historyApiFallback: true, // Enables support for single-page applications
    open: true,               // Opens the browser after the server has been started
    hot: true,                // Enables hot module replacement
  },
  mode: "development"
};
