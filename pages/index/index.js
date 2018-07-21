//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    inputPwd:'',
    auth_type:"认证",
    pwd_input:false,
    finger_auth:"",
  },
  onLoad: function () {  
   
  },

  /**
   * 展示的时候
   */
  onShow:function(){
    var that = this;
    if (wx.canIUse('checkIsSupportSoterAuthentication')) {
      //是否支持当前接口
      wx.checkIsSupportSoterAuthentication({
        success(res) {
          // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
          // res.supportMode = ['fingerPrint'] 只支持指纹识别
          // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
          console.log(res.supportMode)
          if (res.supportMode.indexOf('fingerPrint') != -1) {
            that.authByFinger();
          } else {
            that.authByCode();
          }
        },
        fail(res) {
          that.authByCode();
        }
      })
    } else {
      //直接用密码登录
      that.authByCode();
    }
  },
  /**
   * 指纹认证
   */
  authByFinger: function(){
    var timestamp = Date.parse(new Date());
    var that = this;
    that.setData({
      finger_auth: "Auth " + timestamp
    })
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: that.data["finger_auth"],
      authContent: '为保证使用安全，请使用指纹解锁',
      success(res) {
        var obj = JSON.parse(res.resultJSON);
        if(obj.raw==that.data["finger_auth"]){
          wx.setStorageSync("lastAuthTime", new Date().getTime());
          wx.redirectTo({
            url: '/pages/pwd/index',
          });
          return;
        }else{
          fingerAuthFailedAlert();
        }
      },
      fail(res) {
        that.changeToPwdAlert();
      }
    })
  },

  /**
   * 监听密码变化
   */
  setPwd:function(e){
    this.setData({
      inputPwd:e.detail.value
    });
  },

  /**
   * 通过密码认证
   */
  authByCode:function(){
    var initPwd = wx.getStorageSync('authPwd');
    this.setData({
      pwd_input:true,
    })
    if(initPwd&&initPwd.length==6){

    }else{
      //设置密码
      this.setData({
        auth_type:"设置小程序密码"
      })
    }
  },

  /**
   * 指纹校验失败切换提醒
   */
  changeToPwdAlert:function(){
    var that = this;
    wx.showModal({
      content: '启动指纹校验失败，将使用密码验证',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.authByCode();
        }
      }
    });
  },

  /**
   * 指纹校验失败弹窗提醒
   */
  fingerAuthFailedAlert: function () {
    var that = this;
    wx.showModal({
      content: '指纹认证失败，请重新认证',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.authByFinger();
        }
      }
    });
  },

  /**
   * 密码错误弹窗提醒
   */
  pwdWrongAlert:function(){
    wx.showModal({
      content: '密码校验失败，请重新认证',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
        }
      }
    });
  },
  
  /**
   * 第一次保存登录密码，或者校验密码
   */
  savePwd:function(){
    var initPwd = wx.getStorageSync('authPwd');
    if(initPwd&&initPwd.length==6){
      if(initPwd != this.data["inputPwd"]){
        this.pwdWrongAlert();
        return false;
      }
    }else{
      //第一次设置密码
      if(this.data["inputPwd"].length!=6){
        wx.showModal({
          content: '密码长度不能小于6位',
          showCancel: false,
          success: function (res) {
          }
        });
        return false;
      }
    }
    wx.setStorageSync("lastAuthTime", new Date().getTime());
    wx.setStorageSync("authPwd", this.data["inputPwd"]);
    wx.redirectTo({
      url: '/pages/pwd/index',
    });
  }
})
