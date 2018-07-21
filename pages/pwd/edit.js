// pages/pwd/edit.js
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    random: false,
    array: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
    index: 0,
    showTopTips: false,
    Error: "",
    list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = options.timestamp;
    var scene = options.scene;
    var list = JSON.parse(wx.getStorageSync("list"))
    this.setData({
      timestamp:timestamp,
      old_scene:scene,
      list:list,
      scene:scene,
    })
    for(var i=0;i<list.length;i++){
      //找到
      if(list[i].timestamp==timestamp&&list[i].scene==scene){
        this.setData({
          pwd:list[i].pwd
        })
        break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 随机开关变化
   */
  changeSwitch: function (e) {
    var that = this;
    that.setData({
      random: e.detail.value,
    })
    if (e.detail.value) {
      that.resetPwd();
    }
  },

  /**
   * 设置随机密码
   */
  resetPwd: function () {
    var length = this.data["array"][this.data["index"]];
    var char_arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_".split('');
    char_arr.sort(function () {
      return .5 - Math.random();
    });
    var new_pwd = "";
    for (var i = 0; i < length; i++) {
      new_pwd += char_arr[i];
    }
    this.setData({
      pwd: new_pwd
    })
  },

  /**
   * 随机密码长度变化
   */
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
    this.resetPwd()
  },

  /**
   * 监听密码变化
   */
  changePwd: function (e) {
    var that = this;
    that.setData({
      pwd: e.detail.value
    });
  },

  /**
   * 监听场景变化
   */
  changeScene: function (e) {
    var that = this;
    that.setData({
      scene: e.detail.value
    })
  },

  /**
   * 保存修改
   */
  confirm: function (e) {
    var that = this;
    if (that.data["scene"] == "") {
      that.showError("场景不能为空");
      return;
    }
    if (that.data["pwd"] == "") {
      that.showError("密码不能为空");
      return;
    }
    //生成对象
    var time_str = util.getTime();
    var record_obj = {
      "time": time_str,
      "scene": that.data["scene"],
      "pwd": that.data["pwd"],
      "timestamp": new Date(time_str).getTime()
    };
    //找到并替换
    var list = that.data["list"]
    for(var i=0;i<list.length;i++){
      //找到
      if (list[i].timestamp == that.data.timestamp && list[i].scene == that.data.old_scene) {
        list[i] = record_obj;
        break;
      }
    }
    var json_str = JSON.stringify(that.data["list"]);
    //跳转
    wx.setStorageSync("list", json_str);
    wx.navigateBack({
      
    })
  },

  /**
   * 删除记录
   */
  remove:function(){
    var that = this;
    //找到并删除
    var list = that.data["list"]
    for (var i = 0; i < list.length; i++) {
      //找到
      if (list[i].timestamp == that.data.timestamp && list[i].scene == that.data.old_scene) {
        list.splice(i,1)
        break;
      }
    }
    var json_str = JSON.stringify(that.data["list"]);
    //跳转
    wx.setStorageSync("list", json_str);
    wx.navigateBack({

    })
  },

  /**
   * 展示错误
   */
  showError: function (msg) {
    var that = this;
    that.setData({
      showTopTips: true,
      Error: msg
    })
  }
})