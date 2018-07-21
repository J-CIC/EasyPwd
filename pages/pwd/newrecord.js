// pages/pwd/newrecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    random:false,
    array:[6,7,8,9,10,11,12,13,14,15,16],
    index:0,
    scene:'',
    pwd:'',
    showTopTips:false,
    Error:"",
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },


  /**
   * 监听开关
   */
  changeSwitch: function (e) {
    var that = this;
    that.setData({
      random:e.detail.value,
    })
    if(e.detail.value){
      that.resetPwd();
    }
  },

  /**
   * 设置随机密码
   */
  resetPwd:function(){
    var length = this.data["array"][this.data["index"]];
    var char_arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_".split('');
    char_arr.sort(function () {
      return .5 - Math.random();
    });
    var new_pwd = "";
    for(var i = 0;i<length;i++){
      new_pwd += char_arr[i];
    }
    this.setData({
      pwd:new_pwd
    })
  },

  /**
   * 监听随机密码长度变化
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
  changePwd:function(e){
    var that = this;
    that.setData({
      pwd:e.detail.value
    });
  },

  /**
   * 监听场景变化
   */
  changeScene:function(e){
    var that = this;
    that.setData({
      scene:e.detail.value
    })
  },

  /**
   * 确认修改
   */
  confirm:function(e){
    var that = this;
    if(that.data["scene"]==""){
      that.showError("场景不能为空");
      return ;
    }
    if(that.data["pwd"]==""){
      that.showError("密码不能为空");
      return;
    }
    //生成对象
    var time_str = that.getTime();
    var record_obj = {
      "time":time_str,
      "scene":that.data["scene"],
      "pwd":that.data["pwd"],
      "timestamp":new Date(time_str).getTime()
    };
    //保存
    var json_str = wx.getStorageSync("list");
    var json_arr;
    if(json_str&&json_str.length>0){
      json_arr = JSON.parse(json_str);
      json_arr.push(record_obj)
    }else{
      json_arr = [record_obj];
    }
    json_str = JSON.stringify(json_arr);
    wx.setStorageSync("list",json_str);
    //跳转
    wx.navigateBack({
      
    })
  },

  /**
   * 获取时间
   */
  getTime:function(){
    var date = new Date();
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate() )  + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()); 
    return Y + M + D + h + m + s;
  },

  /**
   * 展示错误
   */
  showError:function(msg){
    var that = this;
    that.setData({
      showTopTips:true,
      Error:msg
    })
  }
})