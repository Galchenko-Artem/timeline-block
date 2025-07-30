const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');

module.exports = (_env, argv) => ({
  entry: './src/index.tsx',
  mode: argv.mode || 'development',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: { extensions: ['.ts', '.tsx', '.js'] },
  devtool: 'source-map',
  devServer: { hot: true, port: 3000 },
  module: {
    rules: [
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s?css$/,
        use: [
          argv.mode === 'production'
            ? MiniCssExtract.loader
            : 'style-loader',
          'css-loader', 'sass-loader'
        ]
      },
      { test: /\.(png|svg|jpg|gif)$/, type: 'asset' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtract({ filename: '[name].[contenthash].css' })
  ]
});
