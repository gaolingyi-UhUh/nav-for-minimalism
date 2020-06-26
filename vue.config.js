const isProduction = process.env.NODE_ENV === 'production';

module.exports = {

  // publicPath: isProduction ? '/navforminimalism/dist' : '/',
  publicPath: './',
  productionSourceMap: false,
  devServer: {
    open: true, //配置自动启动浏览器
  },
  //优化打包
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false,
    extract: {
      filename: `css/[name].css`,
      chunkFilename: `css/[name].css`
    }
  },
  configureWebpack: () => {

    return {
      optimization: {
        splitChunks: {
          cacheGroups: {
            runtimeChunk: {
              name: 'manifest',
              // path: resolve(__dirname, 'build')
            }
          }
        }
      },
      // 输出重构  打包编译后的 文件名称  【模块名称.js 】
      output: {
        filename: `js/[name].js`,
        chunkFilename: `js/[name].js`,
      },



    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '123'
        return args
      })
    config.module
      .rule("images")
      .test(/\.(jpg|png|gif)$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 9 * 1024,//9kb以下转base64
        esModule: false,
        name: 'img/[hash:5].[ext]'
      })
      .end()
  },
}

console.log(`
________   ________          ________  ___  ___  ________     
|\\   ___  \\|\\   __  \\        |\\   __  \\|\\  \\|\\  \\|\\   ____\\    
\\ \\  \\\\ \\  \\ \\  \\|\\  \\       \\ \\  \\|\\ /\\ \\  \\\\\\  \\ \\  \\___|    
 \\ \\  \\\\ \\  \\ \\  \\\\\\  \\       \\ \\   __  \\ \\  \\\\\\  \\ \\  \\  ___  
  \\ \\  \\\\ \\  \\ \\  \\\\\\  \\       \\ \\  \\|\\  \\ \\  \\\\\\  \\ \\  \\|\\  \\ 
   \\ \\__\\\\ \\__\\ \\_______\\       \\ \\_______\\ \\_______\\ \\_______\\
    \\|__| \\|__|\\|_______|        \\|_______|\\|_______|\\|_______|     --高灵易
`)