var app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: true
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
    
  },
  showInfo(content,confirmText) {
    var that=this;
    wx.showModal({
      title: '系统提示',
      content: content,
      showCancel: false,
      confirmText: confirmText,
      success(res) {
        if (res.confirm) {
          that.setData({
            isHide: true
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.showLoading({
        title: '登录授权中',
      })
      var promies = new Promise(function (resolve, reject) {
        wx.login({
          success: function (res) {
            if (res.code) {
              // console.log(res.code);
              //发起网络请求
              wx.request({
                url: app.globalData.ipAddress+"/user/getOpenId?code="+res.code,
                success: res => {
                  // 获取到用户的 openid
                  console.log(res);
                  // 获取用户信息
                  if(res.data.meta.success){
                    console.log(res.data.data)
                    resolve(res.data.data);
                  }else{
                    showInfo("登录失败", res.data.meta.message);
                  }
                }
              })
            } else {
              showInfo("登录失败","重新授权");
            }
          }
        })
      })
      promies.then(function (res) {
        e.detail.userInfo.openid = res;
        // 获取到用户的信息了，打印到控制台上看下
        console.log("用户的信息如下：");
        console.log(JSON.stringify(e.detail.userInfo));
        wx.request({
          url: app.globalData.ipAddress+'/user/saveWxUser', 
          data: e.detail.userInfo,
          method: 'post',
          dataType: 'json',
          success(res) {
            console.log(res.data);
            if (res.data.meta.success) {
              wx.setStorageSync('username',e.detail.userInfo.nickName);
              wx.setStorageSync('avatarUrl',e.detail.userInfo.avatarUrl);
              wx.setStorageSync('openid', e.detail.userInfo.openid)
              //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
              that.setData({
                isHide: false
              });
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      
                    })
                  }, 2000)
                },
                fail: function () {
                },
                complete: function () {
                  wx.hideLoading();
                }
              });
              
            } else {
              that.showInfo("登录失败，重新登录","重新授权");
              wx.hideLoading();
            }
          },
          fail: function () {
            that.showInfo("登录失败，重新登录","重新授权");
            wx.hideLoading();
          }
        });
      })
    } else {
      //用户按了拒绝按钮
      that.showInfo("请授权之后再进入","返回授权");
    }
  }
})