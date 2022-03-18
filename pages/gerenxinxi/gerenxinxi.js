import WxValidate from '../../utils/plugin/WxValidate.js'
var app = getApp();
Page({
  data: {
    items: [{
        name: '0',
        value: '男',
        checked: true
      },
      {
        name: '1',
        value: '女',
        checked: false
      },
    ],
    imgUrl: '',
    name: '',
    disType: '普通型颈椎病',
    cardNo1: '',
    sex: '',
    cardNo: '',
    array: ['普通型颈椎病', '神经根型颈椎病', '脊髓型颈椎病', '交感神经型颈椎病 ', ' 椎动脉型颈椎病'],
    objectArray: [{
        id: 0,
        name: '普通型颈椎病'
      },
      {
        id: 1,
        name: '神经根型颈椎病'
      },
      {
        id: 2,
        name: '脊髓型颈椎病'
      },
      {
        id: 3,
        name: '交感神经型颈椎病'
      },
      {
        id: 4,
        name: '椎动脉型颈椎病'
      }
    ],
    multiIndex: [0, 0, 0],
    date: '2016-09-01',
    time: '12:01',
    address: ['广东省', '广州市', '海珠区'],
    isNew: true,
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
  userNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  userAgeInput: function (e) {
    this.setData({
      age: e.detail.value
    })
  },

  userNumberInput: function (e) {
    this.setData({
      cardNo: e.detail.value
    })
  },
  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
  },
  radioChange: function (e) {
    var checked = e.detail.value
    console.log(this.data.items[checked].value);
    this.setData({
      sex: this.data.items[checked].value
    })
  },
  onLoad: function () {
    var that = this
    wx.request({
      url: app.globalData.ipAddress + '/user/personalCenter',
      data: {
        'openid': wx.getStorageSync('openid'),
      },
      method: "get",
      success: function (res) {
        console.log(res);
        try {
          if (res.data.meta.success) {
            if (res.data.data.haveInfo) {
              var userInfo = res.data.data.userInfo;
              console.log(userInfo);
              that.setData({
                imgUrl: res.data.data.avatarUrl,
                isNew: false,
                name: userInfo.name,
                age: userInfo.age,
                sex: userInfo.sex,
                address: userInfo.address.split(','),
                cardNo: userInfo.cardNo,
                disType: userInfo.disType,
                date: userInfo.date,
                cardNo1: userInfo.cardNo.slice(0, 4) + "**************"
              })
              if (userInfo.sex == '男') {
                that.data.items[0].checked = true;

              } else {
                that.data.items[1].checked = true;
              }
            }
          } else {
            wx.removeStorageSync('openid');
            wx.navigateTo({
              url: '../login/login',
            });
          }
        } catch (e) {
          console.log("服务器异常：" + res.statusCode)
        }
      }
    });
    this.initValidate();
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    const rules = {
      name: {
        required: true,
      },
      age: {
        required: true,
      },
      sex: {
        required: true
      },
      cardNo: {
        required: true,
        idcard: true
      },
      address: {
        required: true
      },
      disType: {
        required: true
      },
      date: {
        required: true
      }
    }
    const messages = {
      name: {
        required: '请填写姓名'
      },
      age: {
        required: "请填写年龄"
      },
      sex: {
        required: "请填写性别"
      },
      cardNo: {
        required: '请填写身份证号码',
        idcard: '请填写正确的身份证号码'
      },
      address: {
        required: "请选择地址"
      },
      disType: {
        required: "请选择颈椎病类型"
      },
      date: {
        required: "请选择就诊时间"
      }
    }
    this.WxValidate = new WxValidate(rules, messages);
  },
  bindButtonTap: function (e) {
    var params = e.detail.value;

    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    params.openid = wx.getStorageSync("openid");
    params.address = params.address.join(',');
    if (params.sex == '0') {
      params.sex = "男";
    } else {
      params.sex = "女";
    }

    console.log(params)
    var that = this;

    // 发送验证请求
    wx.request({
      url: app.globalData.ipAddress + '/user/saveUserInfo',
      data: params,
      dataType: 'json',
      method: "post",
      success: function (res) {
        that.data.isNew = false;
        try {
          console.log(res);
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000,
            success: function () {
              setTimeout(function () {
                wx.switchTab({
                  url: '../me/me',
                  success: (result) => {},
                  fail: (err) => {
                    console.log(err)
                  },
                  complete: () => {}
                });
              }, 2000)
            },
            fail: function () {

            },
            complete: function () {

            }
          });
        } catch (e) {
          console.log("服务器异常：" + res.statusCode);
        }

      }
    })

    this.setData({
      focus: true
    })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value;
    var pos = e.detail.cursor;
    if (pos != -1) {
      //光标在中间
      var left = e.detail.value.slice(0, pos);
      //计算光标的位置
      pos = left.replace(/11/g, '2').length;
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g, '2'),
      cursor: pos
    }

  },
  bindPickerChange: function (e) {
    console.log('颈椎类型picker发送选择改变，携带值为', this.data.array[e.detail.value])

    this.setData({
      disType: this.data.array[e.detail.value],
      index: e.detail.value
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('颈椎类型picker发送选择改变，携带值为', this.data.array[e.detail.value])
    this.setData({
      disType: this.data.array[e.detail.value]
    })
  },
  bindDateChange: function (e) {
    console.log('日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    console.log('时间picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('位置picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: e.detail.value
    })
  },
  updatePage: function (e) {
    this.setData({
      isNew: true
    })
  }
})