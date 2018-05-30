var path = require('path');   /* do not need npm to import this .. it is part of node (i.e. CommonJS) */

module.exports = {
  entry: {
    App: "./app/assets/scripts/App.js",
    Vendor: "./app/assets/scripts/Vendor.js"
  },
  output: {
    path: path.resolve(__dirname, "./app/temp/scripts"),
    filename: "[name].js"                                /* the file name is dynamic i.e. App.js or Vendor.js */
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        test: /\.js$/,
        exclude: /[node_modules]/
      }
    ]
  }
}

    /* reg exp tells babel we only want this plugin to apply to javascript files */