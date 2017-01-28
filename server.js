var webpack = require('webpack');
var path = require('path');
var express = require('express');
var config = require('./config/webpack.config.dev');

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, './src/index.html'));
});

app.listen(port, function() {
  console.log('listening on port ' + port);
});
