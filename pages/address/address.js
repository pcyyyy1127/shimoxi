// pages/address/address.js
Page({

 
  data: {
  
  },

  onLoad: function (options) {
  
  },

  
  onReady: function () {
  
  },

 
  onShow: function () {
  
  },

 
  onHide: function () {
  
  },

  onUnload: function () {
  
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


  onReachBottom: function () {
  
  },

 
  onShareAppMessage: function () {
  
  }
})