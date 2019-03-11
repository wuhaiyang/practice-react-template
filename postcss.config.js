
// 自动根据浏览器为我们申明的css3 添加兼容前缀
module.exports = {
  plugins: [
    require('autoprefixer')({
      "browsers": [
      "defaults",
      "not ie < 11",
      "last 2 versions",
      "> 1%",
      "iOS 7",
      "last 3 iOS versions"
      ]
    })
  ]
}