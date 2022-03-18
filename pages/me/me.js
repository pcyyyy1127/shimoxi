//获取应用实例
var util = require("../../utils/util.js");
var app = getApp()
Page({
  data: {
    open: false,
    touxiang: "",
    name: "登录",
    userInfo: {},
    userListInfo: [{
        icon: '../../images/bar/iconfont-help.png',
        text: '个人信息',
      },
      {
        icon: '../../images/bar/iconfont-dingdan.png',
        text: '使用记录',
        isunread: true,
        unreadNum: 2
      }, {
        icon: '../../images/bar/iconfont-kefu.png',
        text: '联系客服'
      },

      {
        icon: '../../images/bar/iconfont-help.png',
        text: '常见问题'
      }
    ]

  },
  onPullDownRefresh:function(){
    console.log("刷新");
    wx.showNavigationBarLoading();
    this.onLoad();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  onShow: function (options) {
    var _this=this;
    util.checkLogin(function (res) {
      if (res) {
        _this.setData({
          name: wx.getStorageSync('username') || "登录",
          touxiang: wx.getStorageSync('avatarUrl'),
        })
      }
    }, function (res) { 
    });
  },
  router: function (e) {
    // console.log(e)

    util.checkLogin(function (res) {
      if (res) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      }
    }, function (res) {
      util.showModal("中医智能敷贴","未登录，前往登录","../login/login",function(){

      })
    });
  },
  routerLogin: function () {
    wx.navigateTo({
      url: '../login/login',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  }

})