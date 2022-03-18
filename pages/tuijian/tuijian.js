// pages/tuijian/tuijian.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: 15,
    temp: 45

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
    console.log('方案Score')
    console.log(app.globalData.fanganScore);
    var score = app.globalData.fanganScore;
    var that = this;
    wx.request({
      url: app.globalData.ipAddress + '/user/getTjMethod',
      data: {
        'score': score,
        'openid': wx.getStorageSync('openid')
      },
      method: 'POST',
      dataType: 'json',
      success: (result) => {
        console.log(result);
        that.setData({
          time: result.data.data.time,
          temp: result.data.data.temp,
        })
      },
      fail: () => {
        console.log("出错了")
      },
    });

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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log("刷新");
    wx.showNavigationBarLoading();
    this.onLoad();
    setTimeout(() => {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})