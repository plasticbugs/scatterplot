// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin(
  "./dist/css/style.min.css"
);

module.exports = {
  entry: [
    './src/Main.jsx'
  ],
  plugins: [
    // new UglifyJSPlugin({
    //   test: /\.js($|\?)/i,
    //   sourceMap: true
    // }),
    extractSass
  ],
  output: {
    filename: './dist/js/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: extractSass.extract({
          use: [{
              loader: "css-loader?minimize", // translates CSS into CommonJS          
            },
            {
              loader: "sass-loader" // creates style nodes from JS strings
            }]
        })
      }
    ]
  }
};
