const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, 'App.jsx'),
    output: {
      path: path.resolve(__dirname, '.'),
      filename: './app.js',
    },
    resolve: {
      modules: [
        path.resolve('./'),
        path.resolve('./node_modules'),
      ],
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {test: /\.html$/, use: [{loader: 'file-loader?name=[name].[ext]'}]},
        {test: /\.jsx?$/, use: [{loader: 'babel-loader'}]},
      ]
    }
};