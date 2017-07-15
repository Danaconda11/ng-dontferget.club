module.exports = {
  context: __dirname+'/public/js',
  entry: './index.jsx',
  output: {
    path: __dirname+'/public/js',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'babel-loader'},
    ],
  },
}
