//app.js
var util = require('utils/util.js');
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // console.log("APP onlaunch")
  },

  /**
   * 如果超出上次验证时间，返回首页进行验证
   */
  onShow:function(args){
    // console.log(args)
    if (!util.checkLastAuthTime()) {
      if (args.path !="pages/index/index") {
        wx.redirectTo({
          url: '/pages/index/index',
        });
      }
    }
  },

  globalData: {
    userInfo: null
  }
})