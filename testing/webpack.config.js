const src  = `${__dirname}/src`;
const dist = `${__dirname}/dist`;

module.exports = {
  mode: 'development',
  entry: src + '/index.jsx',
  output: {
    path: dist,
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: []
}