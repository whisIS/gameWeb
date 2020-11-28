module.exports = {
    // 基本路径
    publicPath: "./",
    // 输出文件目录
    outputDir: process.env.VUE_APP_DIR_NAME,
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 用于放置生成的静态资源的目录
    assetsDir: "assets",
    // webpack-dev-server 相关配置
    devServer: {
      open: true,
      host: "0.0.0.0",
      port: 5958,
      https: false,
      hotOnly: false,
      before: () => { },
      proxy: {
        '/api': {
            target: 'http://localhost:8080/',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
              '^/api': ''
            }
        }
      }
    },
    pages: {
      index: {
        // page 的入口
        entry: "./src/main.js",
        // 模板来源
        template: "public/index.html",
        // 在 dist/index.html 的输出
        filename: "index.html"
      }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 第三方插件配置
    pluginOptions: {}
  };
  