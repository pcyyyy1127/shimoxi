var util = require('../../utils/util.js');
var app = getApp();

Page({
  data: {
    showTopTips: false,
    errorMsg: "",
    Issign: false
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
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
  formSubmit: function (e) {
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
    console.log('这是提交')
    console.log(e);
    var account = e.detail.value.account;
    var password = e.detail.value.password;
    var subPassword = e.detail.value.subPassword;
    var that = this;
    console.log(account.trim());
    console.log(password);
    console.log(subPassword);

    // 判断账号是否为空和判断该账号名是否被注册
    if ("" == account.trim()) {
      wx.showModal({
        title: '提示',
        content: '账号不能为空',
      });
      return;
    } else {
      console.log('请求后端api');
      wx.request({
        url: 'http://192.168.43.115:3000/api/checkUserName',
        data: {
          'account': account.trim(),
        },
        method: "post",
        success: function (res) {
          console.log(res);
          if (res.data == '') {
            console.log("用户还没有注册");

            // 判断密码是否为空
            if ("" == password.trim()) {
              wx.showModal({
                title: '提示',
                content: '密码不能为空',
              });
              return;
            }
            // 两个密码必须一致
            if (subPassword != password) {
              wx.showModal({
                title: '提示',
                content: '密码不一致',
              });
              return;
            }

            // 验证都通过了执行注册方法
            wx.request({
              url: 'http://192.168.43.115:3000/api/addUserName',
              data: {
                'account': account.trim(),
                'password': password
              },
              method: "post",
              success: function (res) {
                console.log(res);
                // if (res.data == '') {
                //   console.log("用户还没有注册");
                // }
                // else {
                //   wx.showToast({
                //     title: '用户名已经注册',
                //     icon: 'loading'
                //   })
                // }
              }
            });
            wx.showToast({
              title: '注册成功',
              icon: 'success'
            })
            console.log('跳转成功')
            wx.navigateBack({
              delta: 1
            })



          } else {
            console.log("用户已经注册");

            wx.showToast({
              title: '用户名已经注册',
              icon: 'loading'
            })


          }
        },
        fail: function (err) {
          console.log(err);
          wx.showToast({
            title: err.errMsg,
            icon: 'loading'
          })

        }

      })

    }





  }
})