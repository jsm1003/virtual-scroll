const path = require('path');
const Config = require('webpack-chain');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  baseUrl: '/',
  /**
   * https://github.com/neutrinojs/webpack-chain
   * @param {Config} webpackConfig
   */
  // prettier-ignore
  chainWebpack(webpackConfig) {
    const context = webpackConfig.store.get('context');
    const resolve = (...paths) => path.resolve(context, ...paths);

    webpackConfig.resolve.extensions.merge(['.md']);

    // --------- Custom alias ---------
    webpackConfig.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@assets', resolve('src/assets'))
      .set('@utils', resolve('src/utils'));

    // ---------  Global css resource ---------
    function addStyleResoure(rule) {
      rule
        .use('style-resources')
        .loader('style-resources-loader')
        .options({
          patterns: [
            resolve('src/styles/global/*.scss'),
            resolve('src/assets/sprite/sprite.scss'),
          ]
      })
    }

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResoure(webpackConfig.module.rule('scss').oneOf(type)))

    webpackConfig.when(isDev, config => {
      config
      .plugin('browser-sync')
        .use(BrowserSyncPlugin, [
          {
            port: 8421,
            proxy: 'http://localhost:8080',
            open: 'external',
            notify: false,
            timeStamps: true,
            ghostMode: {
              clicks: true,
              scroll: false,
            },
          },
          { reload: false },
        ])
    })

    webpackConfig.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true
      })
  }
  // prettier-ignore-end
};
