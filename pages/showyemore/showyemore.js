var app = getApp();

Page({
  data: {
    array: []
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
            array: result.data.data.list
          })
        } catch (e) {
          console.log("服务器异常:" + result.statusCode);
        }

      },
      fail: () => {},
      complete: () => {}
    });
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
})