const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const PAGE_PATH = path.resolve(__dirname, './src/pages');

var entryFiles = glob.sync(PAGE_PATH + '/*');
var pagesmap = {};
entryFiles.forEach(filePath => {
  var filename = filePath.substring(filePath.lastIndexOf('/') + 1);
  pagesmap[filename] = {
    entry: filePath + '/index.js',
    template: filePath + '/index.html',
    filename: filename + '.html',
    chunks: ['chunk-vendors', 'chunk-common', filename]
  };
});

var baseConfig = {
  pages: pagesmap,

  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }));
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      },
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 50,
            propList: ['*']
          })
        ]
      }
    }
  }
};

var devConfig = {
  baseUrl: '/',
  filenameHashing: false,
  devServer: {
    host: '0.0.0.0',
    port: 8094
  }
};

var prodConfig = {
  baseUrl: '',
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin, [
      {
        analyzerMode: 'static',
        reportFilename: 'report.html',
        openAnalyzer: false,
        logLevel: 'info'
      }
    ]);
  }
};

var config = process.env.NODE_ENV === 'production' ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig);

module.exports = config;
