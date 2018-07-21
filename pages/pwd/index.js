// pages/pwd/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count:0,
    sync:false,
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  sortFunc:function(a,b){
    return b.timestamp-a.timestamp
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var list_str = wx.getStorageSync("list");

    if(list_str&&list_str.length>0){
      this.setData({
        list:JSON.parse(list_str).sort(this.sortFunc)
      });
    }
    this.setData({
      count:this.data["list"].length
    });
  },

  /**
   * 展示并复制密码
   */
  showPwd:function(e){
    var that = this;
    var timestamp = e.target.id;
    var pwd = "";
    for(var i=0;i<that.data.list.length;i++){
      if(that.data.list[i].timestamp==timestamp){
        pwd = that.data.list[i].pwd;
      }
    }
    wx.showModal({
      content: '密码为：\n'+ pwd +'\n点击复制将密码复制到剪贴板',
      cancelText: "取消",
      confirmText:"复制",
      success: function (res) {
        if(res.confirm){
          //设置到剪贴板
          wx.setClipboardData({
            data: pwd,
            success: function (res) {
              
            }
          })
        }
      }
    });
  },

  /**
   * 同步开关变化
   */
  changeSync:function(e){
    var that = this;
    if(e.detail.value){
      //提示
      wx.showModal({
        content: '暂不支持同步功能，请等待下一版本更新',
        showCancel: false,
        success: function (res) {
        }
      });
    }
    that.setData({
      sync:false
    })
  },

  /**
   * 重置登录密码
   */
  resetLoginPwd:function(){
    wx.setStorageSync("authPwd", "");
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
})