// pages/zhang/zhang.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    doctorInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("option", options.id);
    this.setData({
      id: options.id,
    });
    wx.request({
      url: app.globalData.ipAddress + '/doctor/findAll',
      data: {
        'openid': wx.getStorageSync('openid'),
        'id': options.id
      },
      method: 'GET',
      dataType: 'json',
      success: (result) => {
        this.setData({
          doctorInfo: result.data.data.list[0]
        });
        console.log(result.data.data.list)
        wx.setNavigationBarTitle({
          title: result.data.data.list[0].name,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      },
      fail: () => {},
      complete: () => {}
    });

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