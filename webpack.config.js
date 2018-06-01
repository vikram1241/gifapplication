const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  mode: (process.env.NODE_ENV || 'development'),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //loader: ["babel-loader", "eslint-loader"]
        loader: ["babel-loader"]
      },
      /*    {
            test: /\.css$/,
            exclude: /node_modules/,
            //loader: "style-loader!css-loader?modules",
            loaders: ['style', 'css', 'style-loader!css-loader?modules'],
            include: /flexboxgrid2/
          }*/
      {
        test: /\.css$/,
        loaders: 'style-loader!css-loader?modules',
        exclude: '/node_modules/',
        //loader: "style-loader!css-loader?modules",
        //include: /flexboxgrid2/
      },
/*      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: __dirname + './node_modules/react-flexbox-grid'
      },*/
      {
        test: /(\.scss|\.css)$/,
        loader: 'style!css?modules!sass',
        include: path.resolve(__dirname, 'react-flexbox-grid'),
        exclude: /(node_modules)/
      },
      {
        test: /\.svg$/,
        use: [{
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true // true outputs JSX tags
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'AppTemplate',
      template: './public/index.html',
      favicon: './public/favicon.ico'
      // inject: 'body'
    })
  ],
  // refer for configuring dev server --> https://webpack.js.org/guides/development/
  devServer: {
  // refer this for more proxy configuration and more options --> https://webpack.js.org/configuration/dev-server/
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  }
};