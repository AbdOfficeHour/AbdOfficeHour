// app.js
! function () {
    //获取页面配置并进行页面分享配置
    var PageTmp = Page
    Page = function (pageConfig) {
      let view = Page
      //全局开启分享
      pageConfig = Object.assign({
        onShareAppMessage: function () {
          return {
            title:"ABDN Office Hour",
            imageUrl: wx.getStorageSync("shareUrl")
          }
        }
      }, pageConfig);
      // 配置页面模板
      PageTmp(pageConfig);
    }
  }();


App({
  towxml:require('/towxml/index'),
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        //env: 'formalcloud-1g5snmwa3dc92179',
        env:"developcloud-3gz9urho4a43b008",
        traceUser: true,
      });
    }

    this.globalData = {};
  }
});
