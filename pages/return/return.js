const app = getApp();
Page({
  data: {
    modalHidden: true,
    staticImg: app.globalData.staticImg,
    current: 0,
    content: [],
    attitude: false,
    time: false,
    efficiency: false,
    environment: false,
    professional: false,
    userStars: [
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
    ],
    userStars2: [
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
    ],
    userStars3: [
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
      "/images/selected.png",
    ],
    wjxScore: 5,
    wjxScore2: 5,
    wjxScore3: 5,
    text: '',
    // textarea
    min: 5, //最少字数
    max: 300, //最多字数 (根据自己需求改变) 
    pics: [],
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
  // 星星点击事件
  starTap: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars = this.data.userStars; // 暂存星星数组
    var len = tempUserStars.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars[i] = "/images/selected.png";
        that.setData({
          wjxScore: i + 1,
        })
      } else { // 其他是空心
        tempUserStars[i] = "/images/normal.png"
      }
    }
    // 重新赋值就可以显示了
    that.setData({
      userStars: tempUserStars
    })
  },
  starTap2: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars2 = this.data.userStars; // 暂存星星数组
    var len = tempUserStars2.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars2[i] = "/images/selected.png";
        that.setData({
          wjxScore2: i + 1,
        })
      } else { // 其他是空心
        tempUserStars2[i] = "/images/normal.png"
      }
    }
    // 重新赋值就可以显示了
    that.setData({
      userStars2: tempUserStars2
    })
  },
  starTap3: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
    var tempUserStars3 = this.data.userStars; // 暂存星星数组
    var len = tempUserStars3.length; // 获取星星数组的长度
    for (var i = 0; i < len; i++) {
      if (i <= index) { // 小于等于index的是满心
        tempUserStars3[i] = "/images/selected.png";
        that.setData({
          wjxScore3: i + 1,
        })
      } else { // 其他是空心
        tempUserStars3[i] = "/images/normal.png"
      }
    }
    // 重新赋值就可以显示了
    that.setData({
      userStars3: tempUserStars3
    })
  },
  // 标签
  label: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      attitude: !e.currentTarget.dataset.index
    })
    if (that.data.attitude && that.data.content.indexOf("加热稳定") == -1) {
      that.data.content.push("加热稳定");
    } else if (that.data.content.indexOf("加热稳定") != -1) {
      that.delectContent("加热稳定");
    }
  },
  label1: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      time: !e.currentTarget.dataset.index
    })
    if (that.data.time && that.data.content.indexOf("治疗效果很好") == -1) {
      that.data.content.push("治疗效果很好");
    } else if (that.data.content.indexOf("治疗效果很好") != -1) {
      that.delectContent("治疗效果很好");
    }
  },
  label2: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      efficiency: !e.currentTarget.dataset.index
    })
    if (that.data.efficiency && that.data.content.indexOf("使用舒服") == -1) {
      that.data.content.push("使用舒服");
    } else if (that.data.content.indexOf("使用舒服") != -1) {
      that.delectContent("使用舒服");
    }
  },
  label3: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      environment: !e.currentTarget.dataset.index
    })
    if (that.data.environment && that.data.content.indexOf("智能化控制") == -1) {
      that.data.content.push("智能化控制");
    } else if (that.data.content.indexOf("智能化控制") != -1) {
      that.delectContent("智能化控制");
    }
  },
  label4: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      professional: !e.currentTarget.dataset.index,

    })
    if (that.data.professional && that.data.content.indexOf("很专业") == -1) {
      that.data.content.push("很专业");
    } else if (that.data.content.indexOf("很专业") != -1) {
      that.delectContent("很专业");
    }
  },
  delectContent(params) {
    for (var i = 0; i < this.data.content.length; i++) {
      if (this.data.content[i] == params) {
        this.data.content.splice(i, 1);
      }
    }
  },
  // 留言
  //字数限制  
  inputs: function (e) {
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //最多字数限制
    if (len > this.data.max) return;
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数  
      text: value
    });
  },
  // 图片
  choose: function (e) { //这里是选取图片的方法
    var that = this;
    var pics = that.data.pics;
    wx.chooseImage({
      count: 5 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {

        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);
        console.log(pics);
        // console.log(imgsrc);
        that.setData({
          pics: pics,
          // console.log(pics),
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })

  },
  //单机按钮
  buttonTap2: function () {
    console.log('触发点击事件');
  },

  uploadimg: function () { //这里触发图片上传的方法
    var pics = this.data.pics;
    console.log(pics);
    app.uploadimg({
      url: 'https://........', //这里是你图片上传的接口
      path: pics //这里是选取的图片的地址数组
    });
  },
  onLoad: function (options) {

  },
  // 删除图片
  deleteImg: function (e) {
    var pics = this.data.pics;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    this.setData({
      pics: pics
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var pics = this.data.pics;
    wx.previewImage({
      //当前显示图片
      current: pics[index],
      //所有图片
      urls: pics
    })
  },
  post: function () {
    console.log(this.data)
    var that = this;
    var obj = {
      openid: wx.getStorageSync('openid'),
      allevalu: that.data.wjxScore,
      mediceevalu: that.data.wjxScore2,
      programevalu: that.data.wjxScore3,
      content: that.data.content.join(','),
      text: that.data.text,
    }
    console.log(JSON.stringify(obj));
    wx.request({
      url: app.globalData.ipAddress + '/user/addScore',
      data: obj,
      method: 'post',
      dataType: "json",
      success: function (res) {
        console.log(res);
        wx.showModal({
          title: '提示',
          content: "反馈信息成功",
          showCancel: true,
          success: function (res) {
            console.log(11)
            if (res.confirm) {
              console.log(22)
              wx.redirectTo({
                url: '../kaishishiyong/kaishishiyong'
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
          fail: function () {
            wx.showModal({
              title: '失败',
              content: '提交失败',
            });
          }
        })
      }

    })


  },
})