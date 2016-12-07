'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

const root = 'client';
const entry = ['babel-polyfill', path.join(__dirname, root, 'app/app.js')];
const dist = path.join(__dirname, 'dist');

// use webpack.config.js to build modules
gulp.task('webpack', ['clean'], (cb) => {
  const config = require('./webpack.dist.config');

  config.entry.app = entry;

  webpack(config, (err, stats) => {
    if(err)  {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
      colors: colorsSupported,
      chunks: false,
      errorDetails: true,
    }));

    cb();
  });
});

gulp.task('serve', () => {
  const config = require('./webpack.dev.config');

  config.entry.app = [
    'webpack-hot-middleware/client?reload=true',
  ].concat(entry);

  const compiler = webpack(config);

  serve({
    port: process.env.PORT || 3000,
    open: false,
    server: {baseDir: root},
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          colors: colorsSupported,
          chunks: false,
          modules: false,
        },
        publicPath: config.output.publicPath,
      }),
      webpackHotMiddleware(compiler),
    ],
  });
});

gulp.task('watch', ['serve']);

gulp.task('clean', (cb) => {
  del([dist]).then((paths) => {
    gutil.log("[clean]", paths);
    cb();
  });
});

gulp.task('default', ['watch']);
