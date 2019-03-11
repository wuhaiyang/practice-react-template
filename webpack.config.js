const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 在webpack.config.js中引入glob 消除未使用的css 
const glob = require('glob');

// 在webpack.config.js中引入purifycss-webpack
const PurifyCSSPlugin = require("purifycss-webpack");


module.exports = {
  // 打包
  mode: 'development',
  // 入口文件配置项
  entry: {
    index: './src/index.js',
    admin: './src/admin.js'
  },
  // 出口文件配置项
  output: {
    // 打包路径
    path: path.resolve(__dirname, './dist'),
    // 打包文件名: [name]的含义就是根据入口文件的名称来进行打包
    filename: '[name].js'
  },
  // 模块：loaders加载
  module: {
    rules: [
      // {
      // 内嵌样式  
      //   // test 为匹配项
      //   test: /\.(sc|sa|c)ss$/,
      //   use: ExtractTextWebpackPlugin.extract({
      //     fallback: 'style-loader',
      //     // css link 方式引入就要不需要style-loader了
      //     use: ['css-loader', 'sass-loader'] //右向左解析
      //   }),
      // },

      // 外部样式
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              // module: true, // 启用css模块化，
              importLoaders: 1, //importLoaders 选项表示在 css-loader 之前应用多少个加载器
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              // minimize: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ] //右向左解析
      },
    ]
  },
  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      // html模板
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      hash: true, // 打包文件追加hash串
    }),
    new HtmlWebpackPlugin({
      // html模板
      template: './src/admin.html',
      filename: 'admin.html',
      chunks: ['admin'],
      hash: true, // 打包文件追加 hash 串
    }),
    // 拆分后把css文件放到dist目录下的css/style.css
    // new ExtractTextWebpackPlugin('css/style.css'),
    new MiniCssExtractPlugin({
      filename: 'css/style.css'
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
  ],
  // 配置webpack开发服务
  devServer: {
    port: 3001, // 端口
    open: true, // 自动打开浏览器
    hot: true, // 开启热更新
    overlay: true, // 浏览器页面上显示错误
    historyApiFallback: true
  }
};