var app = getApp();
var util = require("../../utils/util.js");

Page({
  data: {
    items: [],
    checked: {},
    show:false
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
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    var _that=this;
    wx.request({
      url: app.globalData.ipAddress + '/selectAll',
      data: {
        "openid": wx.getStorageSync('openid'),
      },
      method: "get",
      success(res) {
        if(res.data.meta.success){
          console.log(res)
          var _checked = {};
          var len = res.data.data.length;
          for (var i = 0; i < len; i++) {
            _checked[i] = -1;
          }
          _checked.length = len;
          _that.setData({
            items: res.data.data,
            checked: _checked,
            show:true
          })
            wx.hideLoading();
        }else{
          wx.navigateTo({
            url: '../login/login',
          });
        }
        
      },
      fail() {
        wx.showToast({
          title: '数据加载失败',
          icon: 'none',
          duration: 1500,
          mask: false,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      }
    })

  },
  radioChange: function (e) {
    console.log(e)
    var _chk = this.data.checked;
    _chk[parseInt(e.target.dataset.iid)] = e.detail.value;
    this.setData({
      checked: _chk
    })

  },
  btnCommit: function () {
    var _chk = this.data.checked;
    var that = this;
    for (var item in _chk) {
      if (_chk[item] == -1) {
        item++;
        wx.showModal({
          title: '提示',
          content: '第' + item + "题为作答",
        });
        return;
      }
    }

    wx.showModal({
      title: '提示',
      content: '评教结果一经提交将不能再做修改，确定提交吗？',
      success: function (res) {
        //var that=this
        console.log(res);
        console.log('提交')
        if (res.confirm) {
          wx.showLoading({
            title: '正在提交...'
          });
          var obj = {};
          console.log(_chk)
          var items=that.data.items;
          for (var item in _chk) {
            if (item != "length") {
              obj[items[item].option[0].returnId] = _chk[item];
            }
          }
          console.log("======data========");
          console.log(JSON.stringify(obj))
          wx.request({
            url: app.globalData.ipAddress + '/addAnswer',
            data: {
              "openid": wx.getStorageSync('openid'),
              "NDI": obj,
            },
            method: "post",
            success: function (res) {
              wx.hideLoading();
              console.log(res);
              if (res.data.meta.success) {
                wx.showModal({
                  title: '提示',
                  content: '提交成功！',
                  success: function () {
                    app.globalData.score = res.data.data;
                    wx.redirectTo({
                      url: '../return/return',
                      success: (result)=>{
                        
                      },
                      fail: ()=>{},
                      complete: ()=>{}
                    });
                  }
                })
              } else {
                wx.showToast({
                  title: '提交失败',
                  icon: 'none',
                  duration: 1500,
                  mask: false,
                  success: (result) => {

                  },
                  fail: () => {},
                  complete: () => {}
                });
              }
            },
            fail: function (err) {
              wx.hideLoading();
              wx.showToast({
                title: '提交失败',
                icon: 'none',
                duration: 1500,
                mask: false,
                success: (result) => {

                },
                fail: () => {},
                complete: () => {}
              });
            }
          });


        } else {
          console.log('失败')

        }
      },
      fail: function (res) {
        console.log('失败');
      },
      complete: function (res) {
        console.log("完成");
      },
    });
  }
})