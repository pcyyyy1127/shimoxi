const app = getApp()

Page({
  data: {
    array: ['30', '35', '40', '45'],
    index: 0,
    array2: ['010', '020', '030', '040', '050', '060'],
    index2: 0,
    inputText: '',
    receiveText: '',
    staytemp: -100,
    name: '',
    switch1: false,
    switch2: false,
    connectedDeviceId: '',
    services: {},
    characteristics: {},
    connected: true,
    drug: 0.0,
    characteristics2: {},
    xAxis: [],
    ydata: [],
    isheating: false,
    j: 0,
    intervalId: 0,
    intervalId2: 0,
    time: 0
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
  bindInput: function (e) { //输入数据时候调用
    this.setData({
      inputText: e.detail.value //输入的数据给inputtext
    })
    // console.log(1)
    console.log(e.detail.value)
  },


  //加热
  heat: function () {
    var that = this
    that.data.inputText = "6005";
    var buffer = new ArrayBuffer(that.data.inputText.length) //二进制数组
    var dataView = new Uint8Array(buffer) //八位无符号整型数组
    for (var i = 0; i < that.data.inputText.length; i++) {
      dataView[i] = that.data.inputText.charCodeAt(i) //返回第i个元素的unicode编码
    }

    wx.writeBLECharacteristicValue({
      deviceId: that.data.connectedDeviceId,
      serviceId: that.data.services[0].uuid,
      characteristicId: that.data.characteristics[1].uuid,
      value: buffer,
      success: function (res) {
        wx.showToast({
          title: '加热成功',
          icon: 'success',
          duration: 1500
        })
        console.log('发送成功')
      }
    })

  },

  //添加数组到折线图
  addData: function () {
    var that = this
    console.log('正在添加数据')
    console.log(that.data.ydata)
    console.log(that.data.xAxis)
    that.data.j = that.data.j + 1

    that.data.ydata.push(that.data.receiveText)
    that.data.xAxis.push(that.data.j)
    // wx.setStorageSync('ydata_1', that.data.ydata)
    // wx.setStorageSync('xAxis_1', that.data.xAxis)


  },

  addData2: function () {
    var that = this
    console.log('改变药物的浓度了')
    that.data.drug = Math.round((that.data.drug + 2.8) * 100) / 100;
    that.setData({
      drug: that.data.drug
    })

  },

  addTime: function () {
    var that = this
    console.log('改变加热时间')
    that.data.time = that.data.time + 1
    that.setData({
      time: that.data.time
    })
  },

  //降温

  disheat: function () {
    var that = this
    that.data.inputText = "1005";
    var buffer = new ArrayBuffer(that.data.inputText.length) //二进制数组
    var dataView = new Uint8Array(buffer) //八位无符号整型数组
    for (var i = 0; i < that.data.inputText.length; i++) {
      dataView[i] = that.data.inputText.charCodeAt(i) //返回第i个元素的unicode编码
    }

    wx.writeBLECharacteristicValue({
      deviceId: that.data.connectedDeviceId,
      serviceId: that.data.services[0].uuid,
      characteristicId: that.data.characteristics[1].uuid,
      value: buffer,
      success: function (res) {
        wx.showToast({
          title: '降温成功',
          icon: 'success',
          duration: 1500
        })
        console.log('发送成功')
      }
    })
  },


  //改变温度
  bindPickerChange1: function (e) {
    console.log('温度选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindPickerChange2: function (e) {
    console.log('时间选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  //按下加热键
  switch1Change: function (e) {
    var that = this

    console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    if (that.data.connected) {
      if (that.data.isheating = true) {
        clearInterval(that.data.intervalId2)
        clearInterval(that.data.intervalId)


      }
      that.data.intervalId2 = setInterval(that.addTime, 1000)
      console.log(that.data.intervalId2)
      that.data.intervalId = setInterval(that.addData2, 1000)
      that.data.isheating = true;
      console.log('222')

      that.data.inputText = that.data.array[that.data.index] + that.data.array2[that.data.index2]







      console.log(that.data.inputText)

      var buffer = new ArrayBuffer(that.data.inputText.length) //二进制数组
      var dataView = new Uint8Array(buffer) //八位无符号整型数组
      for (var i = 0; i < that.data.inputText.length; i++) {
        dataView[i] = that.data.inputText.charCodeAt(i) //返回第i个元素的unicode编码
      }

      wx.writeBLECharacteristicValue({
        deviceId: that.data.connectedDeviceId,
        serviceId: that.data.services[0].uuid,
        characteristicId: that.data.characteristics[1].uuid,
        value: buffer,
        success: function (res) {
          wx.showToast({
            title: '命令发送成功',
            icon: 'success',
            duration: 1500
          })
          console.log('发送成功')
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '蓝牙已断开',
        showCancel: false,
        success: function (res) {
          that.setData({
            searching: false
          })
        }
      })
    }
  },

  //按下停止键

  switch1Change2: function (e) {
    var that = this

    if (that.data.connected) {

      that.data.inputText = "00000";
      clearInterval(that.data.intervalId2)
      clearInterval(that.data.intervalId)
      console.log(that.data.inputText)

      var buffer = new ArrayBuffer(that.data.inputText.length) //二进制数组
      var dataView = new Uint8Array(buffer) //八位无符号整型数组
      for (var i = 0; i < that.data.inputText.length; i++) {
        dataView[i] = that.data.inputText.charCodeAt(i) //返回第i个元素的unicode编码
      }

      wx.writeBLECharacteristicValue({
        deviceId: that.data.connectedDeviceId,
        serviceId: that.data.services[0].uuid,
        characteristicId: that.data.characteristics[1].uuid,
        value: buffer,
        success: function (res) {
          wx.showToast({
            title: '命令发送成功',
            icon: 'success',
            duration: 1500
          })
          console.log('发送成功')
        }
      })


    } else {
      wx.showModal({
        title: '提示',
        content: '蓝牙已断开',
        showCancel: false,
        success: function (res) {
          that.setData({
            searching: false
          })
        }
      })
    }
    wx.navigateTo({
      url: '../../pages/return/return'

    })
  },
  //浓度分析，跳转到echart页面
  Send3: function () {
    var that = this
    clearInterval(that.data.intervalId2)
    clearInterval(that.data.intervalId)
    console.log("执行发送");
    if (that.data.connected) {

      that.data.inputText = "00000";
      clearInterval(that.data.intervalId2)
      clearInterval(that.data.intervalId)
      console.log(that.data.inputText)

      var buffer = new ArrayBuffer(that.data.inputText.length) //二进制数组
      var dataView = new Uint8Array(buffer) //八位无符号整型数组
      for (var i = 0; i < that.data.inputText.length; i++) {
        dataView[i] = that.data.inputText.charCodeAt(i) //返回第i个元素的unicode编码
      }

      wx.writeBLECharacteristicValue({
        deviceId: that.data.connectedDeviceId,
        serviceId: that.data.services[0].uuid,
        characteristicId: that.data.characteristics[1].uuid,
        value: buffer,
        success: function (res) {
          wx.showToast({
            title: '命令发送成功',
            icon: 'success',
            duration: 1500
          })
          console.log('发送成功')
        }
      })
      wx.closeBluetoothAdapter({
        success(res) {
          console.log(res)
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '蓝牙已断开',
        showCancel: false,
        success: function (res) {
          that.setData({
            searching: false
          })
        }
      })
    }

    wx.navigateTo({
      url: '../../pages/line/index'

    })



  },
  //返送数据到后台
  Send2: function () {
    var that = this
    console.log(that.data.inputText)
    console.log(2)



    if (that.data.inputText > 0 || that.data.inputText < 100) {
      if (that.data.connected) {
        wx.request({
          url: 'http://192.168.43.115:3000/api/addHero', //仅为示例，并非真实的接口地址
          method: "POST",
          data: {
            heroName: "张三2",
            age: "16",
            heroSex: "man",
            address: "12",
            heroPosition: ["mid"],
            favourite: "sdfss",
            explain: "dsssd"
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res.data)
          }
        })

      } else {
        wx.showModal({
          title: '提示',
          content: '蓝牙已断开',
          showCancel: false,
          success: function (res) {
            that.setData({
              searching: false
            })
          }
        })
      }

    } else {
      wx.showModal({
        title: '提示',
        content: "输入的浓度不正确",
        showCancel: false,
        success: function (res) {
          that.setData({
            inputText: ""
          })
        }
      })
    }


  },
  //加载时候调用
  onLoad: function (options) { //加载时候调用的函数
    var that = this
    console.log(options)
    that.data.xAxis = []
    that.data.ydata = []


    that.setData({
      name: options.name,
      connectedDeviceId: options.connectedDeviceId
    })
    wx.getBLEDeviceServices({ //获取服务
      deviceId: that.data.connectedDeviceId,
      success: function (res) {
        console.log(res.services) //返回服务
        that.setData({
          services: res.services
        })
        wx.getBLEDeviceCharacteristics({ //得到第一个特征值
          deviceId: options.connectedDeviceId,
          serviceId: res.services[0].uuid,
          success: function (res) {
            console.log(res.characteristics) //如果成功返回特征值
            that.setData({
              characteristics: res.characteristics //把特征值给data对象赋值
            })
            wx.notifyBLECharacteristicValueChange({ //特征值变化的通知
              state: true,
              deviceId: options.connectedDeviceId,
              serviceId: that.data.services[0].uuid,
              characteristicId: that.data.characteristics[0].uuid, //特征值id
              success: function (res) {
                console.log('启用notify成功')
              }
            })
          }
        })


        wx.getBLEDeviceCharacteristics({ //得到第二个特征值
          deviceId: options.connectedDeviceId,
          serviceId: res.services[1].uuid,
          success: function (res) {
            console.log(res.characteristics) //如果成功返回特征值
            that.setData({
              characteristics2: res.characteristics //把特征值给data对象赋值
            })
            console.log("特征值2获取成功")
          }
        })

      }
    })
    wx.onBLEConnectionStateChange(function (res) { //蓝牙状态改变时候调用，监听特征值变化
      console.log(res.connected)
      that.setData({
        connected: res.connected
      })
    })
    wx.onBLECharacteristicValueChange(function (res) { //特征值改变的时候调用
      var receiveText = app.buf2string(res.value)
      var i = 0
      console.log(i + '接收到数据：' + receiveText)
      i++
      if (that.data.switch2) {
        if (receiveText - 2 > that.data.staytemp) {
          console.log('应该停止加热了')
          that.disheat()

        }
        if (receiveText + 2 < that.data.staytemp) {
          console.log('应该加热了')
          that.heat()

        }
      }

      console.log(that.data.staytemp)
      console.log(that.data.switch1)
      that.setData({
        receiveText: receiveText
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  }
})