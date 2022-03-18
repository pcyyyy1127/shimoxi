var util = require("../../utils/util.js");
var app = getApp();

Page({
  data: {
    indicatorDots: false,
    autoplay: true,
    // array: [],
    imgUrls: [
      '../shouye/haibao/haibao-1.jpg',
      '../shouye/haibao/haibao-2.jpg',
      '../shouye/haibao/haibao-3.jpg'
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔
    duration: 1000, //滑动动画时长
    inputShowed: false,
    inputVal: ""
  },
  onPullDownRefresh: function () {
    console.log("刷新");
    wx.showNavigationBarLoading();
    this.onLoad();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },

  onLoad: function (options) {
    wx.request({
      url: app.globalData.ipAddress + '/article/findAll',
      data: {
        "currentPage": 1
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        try {
          console.log(result.data.data.list);
          this.setData({
            array: result.data.data.list.slice(0, 3)
          })
        } catch (e) {
          console.log("服务器异常:" + result.statusCode);
        }

      },
      fail: () => {},
      complete: () => {}
    });
  },

  router: function (e) {
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
      util.showModal("中医智能敷贴", "未登录，前往登录", "../login/login", function () {

      })
    });

  }

})

wx.requestPayment({
  'timeStamp': '',
  'nonceStr': '',
  'package': '',
  'signType': 'MD5',
  'paySign': '',
  'success': function (res) {},
  'fail': function (res) {}
})