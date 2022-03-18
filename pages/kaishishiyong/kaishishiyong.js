var app = getApp();
Page({
  data: {
    cateItems: [{
      cate_id: 1,
      cate_name: "开始使用",
      ishaveChild: true,
      children: [{
        child_id: 1,
        name: '舒颈康',
        image: "/images/iconyaocaiyangsheng/1.jpg"
      }, ]
    }, ],
    curNav: 1,
    curIndex: 0
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

  start: function () {
    wx.navigateTo({
      url: '../../pages/search/search',
    })

  },

  //事件处理函数 
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值 
    let id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index 
    this.setData({
      curNav: id,
      curIndex: index
    })
  },
})