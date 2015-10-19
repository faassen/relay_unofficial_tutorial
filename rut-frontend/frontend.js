import express from 'express';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

const CLIENT_PORT = 3000;
const GRAPHQL_PORT = 8080;

const compiler = webpack({
  entry: {
    'graphiql': path.resolve(__dirname, 'src', 'graphiql.js'),
    'tutorial': path.resolve(__dirname, 'src', 'tutorial.jsx')
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        query: {stage: 2, plugins: ['./src/babelRelayPlugin']},
        test: /\.jsx?$/
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      // inline base64 URLs for <=8k images, direct URLs for the rest
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  resolve: {
      extensions: ['', '.js', '.jsx']
  },
  output: {filename: '[name]-bundle.js', path: '/'}
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public',
  proxy: {'/graphql': 'http://localhost:' + GRAPHQL_PORT},
  publicPath: '/',
  stats: {colors: true},
  noInfo: true
});

app.use('/', express.static(path.resolve(__dirname, 'public')));

app.listen(CLIENT_PORT, () => {
  console.log(
    `Client is now running on http://localhost:${CLIENT_PORT}`
  );
  console.log(
    `Make sure GraphQL server is running on port 8080`
  );
});
