var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  
  // This code will be compiled 
  entry: "./app/App.js",

  // Then output into this file
  output: {
    filename: "public/bundle.js"
  },

  // This will be what we do
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          // These are the specific transformations we'll be using. 
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
        // loader: ExtractTextPlugin.extract('css!sass')  
      }
    ]
  }
  // plugins: [
  //   new ExtractTextPlugin('public/style.css', {
  //     allChunks: true
  //   })
  // ]

}