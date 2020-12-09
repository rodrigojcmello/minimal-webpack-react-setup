const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env = { NODE_ENV: 'development' }) => {
  const prod = env.NODE_ENV === 'production';

  // eslint-disable-next-line no-console
  console.log(`MODE: ${prod ? 'PRODUCTION' : 'DEVELOPMENT'}`);

  return {
    entry: './src/index.tsx',
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: prod ? 'production' : 'development',
    devtool: 'source-map',
    ...(prod
      ? {}
      : { devServer: { historyApiFallback: true, hot: true, hotOnly: true } }),
    plugins: [
      // HTML Template
      new HtmlWebpackPlugin({ template: './index.html' }),

      // Extract CSS for more performance
      prod && new MiniCssExtractPlugin(),

      // Clean old build
      prod && new CleanWebpackPlugin(),

      // Show progress build in terminal
      !prod && new webpack.ProgressPlugin(),

      // Fast Refresh
      !prod && new webpack.HotModuleReplacementPlugin(),
      !prod && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.([tj])sx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: 'last 1 chrome version' }],
                  [
                    '@babel/preset-react',
                    {
                      // Removes the need to import React into JSX files
                      runtime: 'automatic',
                    },
                  ],
                  '@babel/preset-typescript',
                ],
                plugins: [
                  // Fast Refresh
                  !prod && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|woff2?|eot|otf|webp)$/i,
          use: 'file-loader',
        },
        {
          test: /\.module.s?css$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-modules-typescript-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: prod
                    ? '[hash:base64:5]'
                    : '[local]-[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /^((?!\.module).)*s?css$/,
          use: [
            prod ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: ['autoprefixer'],
                },
              },
            },
            'sass-loader',
          ],
        },
      ],
    },
  };
};
