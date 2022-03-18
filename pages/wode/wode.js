var app = getApp()

Page({
  data:{
    account:'',
    password:'',
    touxiang:"",
    name:""
  },

  formName: function (e) {
    this.setData({
      account: e.detail.value
    })
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

  formName2: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
  // that.data.touxiang = e.detail.userInfo.avatarUrl;
   // that.data.name = e.detail.userInfo.nickName;
  //app.globalData.touxiang = e.detail.userInfo.avatarUrl;
  // app.globalData.name=e.detail.userInfo.nickName;
    
      //密码为空
      if (that.data.password == '') {
        wx.showModal({
          title: '提示',
          content: '请输入密码',
        });
        return;
      }

      if (that.data.account == '') {
        wx.showModal({
          title: '提示',
          content: '请输入账号',
        });
      }
     // console.log("这是账户名");
     // console.log(that.data.account);


      //发送验证请求
      wx.request({
        url: 'http://192.168.43.115:3000/api/checkUserName',
        data: {
          'account': that.data.account.trim(),
        },
        method: "post",
        success: function (res) {
          console.log(res);

          if (res.data == '') {
            wx.showToast({
              title: '账号没有注册',
              icon: 'loading'
            })
            return;

          }


          if (res.data[0].password == that.data.password) {
            wx.showToast({
              title: '登录成功',
              icon: 'success'
            })
            app.globalData.isLogin=true;
            app.globalData.account=that.data.account;
            console.log('全局变量');
            console.log(app.globalData);
           
              wx.navigateTo({
                url: '../../pages/me/me' 

              })
              return;

            

          }

          if (res.data[0].password != that.data.password) {
            wx.showToast({
              title: '密码错误',
              icon: 'loading'
            })

          }

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
      })


    
    //接下来写业务代码


    //最后，记得返回刚才的页面
    // wx.navigateBack({
    //   delta: 1
    // })
  },

  login:function(){
    var that=this;
    console.log(that);
   //密码为空
    if (that.data.password=='') {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
      });
      return;
    }

    if(that.data.account==''){
      wx.showModal({
        title: '提示',
        content: '请输入账号',
      });
    }
    console.log("这是账户名");
    console.log(that.data.account);
    

    //发送验证请求
    wx.request({
      url: 'http://192.168.43.115:3000/api/checkUserName',
      data: {
        'account': that.data.account.trim(),
      },
      method: "post",
      success: function (res) {
        console.log(res);
        
        if(res.data==''){
          wx.showToast({
            title: '账号没有注册',
            icon: 'loading'
          })
          return ;

        }


        if (res.data[0].password == that.data.password) {
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
          if(that.data.touxiang!=''){
            console.log('跳转');
            wx.navigateTo({
              url: '../../pages/me/me?touxiang=' + that.data.touxiang + '&name=' + that.data.name

            })
            return;

          }
          
        }
        
        if (res.data[0].password != that.data.password){
          wx.showToast({
            title: '密码错误',
            icon: 'loading'
          })

        }
        
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
    })
    

  },

  saveUserInfo:function(){
    console.log(this);
  },
  onLoad: function () {
   
    // app.globalData.isLogin = true;
    // app.globalData.account = that.data.account;
   
  },
  onShow: function () {
   
    // console.log(app.globalData);
    // if (app.globalData.isLogin == true) {
    //   wx.navigateTo({
    //     url: '../../pages/me/me?touxiang=' + this.data.touxiang + '&name=' + this.data.name

    //   })
    // }
  },
  // choosePhoto: function () {
  //   var that = this;
  //   app.chooseImage(function (imgUrl) {
  //     that.setData({
  //       'userInfo.cover_thumb': imgUrl[0]
  //     })
  //   });
  // },
  // changeGender: function (e) {
  //   this.setData({
  //     'userInfo.sex': e.detail.value
  //   })
  // },
  // inputNickname: function (e) {
  //   this.setData({
  //     'userInfo.nickname': e.detail.value
  //   })
  // },
  // saveUserInfo: function () {
  //   var data = this.data.userInfo;

  // },
  // // bindCellphonePage: function () {
  //   app.turnToPage('/pages/bindCellphone/bindCellphone?r=' + app.getAppCurrentPage().page_router, 1);
  // }

})
