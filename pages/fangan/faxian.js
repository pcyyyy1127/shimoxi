var app = getApp();
var util = require("../../utils/util.js");

Page({
  data: {
    questions: [{
        title: "请选择您的性别",
        content: [{
            name: '8',
            value: '男'
          },
          {
            name: '5',
            value: '女'
          },
        ]
      },
      {
        title: "请选择您的年龄",
        content: [{
            name: '5',
            value: '0-10'
          }, //20
          {
            name: '6',
            value: '11-20'
          }, //15
          {
            name: '7',
            value: '21-30'
          }, //10
          {
            name: '7',
            value: '31-40'
          }, //5
          {
            name: '7',
            value: '41-50'
          }, //5
          {
            name: '8',
            value: '51-60'
          }, //5
          {
            name: '8',
            value: '61-70'
          }, //5
          {
            name: '8',
            value: '71-80'
          }, //5
          {
            name: '8',
            value: '81-90'
          }, //5
          {
            name: '9',
            value: '91-100'
          }, //5
        ]
      },
      {
        title: "请选择您的治疗类型",
        content: [{
            name: '2',
            value: '普通型颈椎病'
          }, //20
          {
            name: '5',
            value: '神经根型颈椎病'
          }, //15
          {
            name: '7',
            value: '脊髓型颈椎病'
          },
          {
            name: '8',
            value: '交感神经型颈椎病'
          }, //5
          {
            name: '9',
            value: '椎动脉型颈椎病'
          }, //5
        ]
      },
      {
        title: "请选择您的膏药品牌",
        content: [{
            name: '9',
            value: '云南白药'
          }, //20
          {
            name: '7',
            value: '唐老'
          }, //15
          {
            name: '6',
            value: '羚锐'
          },
          {
            name: '5',
            value: '福景'
          }, //5
          {
            name: '2',
            value: '金龟灵'
          }, //5
        ]
      },
      {
        title: "请选择您此时的疲劳状况",
        content: [{
            name: '2',
            value: '轻度疲劳'
          }, //20
          {
            name: '6',
            value: '中度疲劳'
          }, //15
          {
            name: '9',
            value: '极度疲劳'
          },

        ]
      },
      {
        title: "请选择您最近的睡眠质量",
        content: [{
            name: '2',
            value: '好'
          }, //20
          {
            name: '4',
            value: '较好'
          }, //15
          {
            name: '6',
            value: '差'
          },
          {
            name: '8',
            value: '极差'
          },

        ]
      },
      {
        title: "请选择您所在地此时温度",
        content: [{
            name: '2',
            value: '-10℃-0℃'
          }, //20
          {
            name: '4',
            value: '0℃-10℃'
          }, //15
          {
            name: '6',
            value: '10℃-20℃'
          },
          {
            name: '8',
            value: '20℃-30℃'
          },
          {
            name: '9',
            value: '30℃-40℃'
          },

        ]
      }
    ],
    checked: [
      -1, -1, -1, -1, -1, -1, -1
    ],
    commitData: {
      cid: '',
      sid: '',
      tid: '',
      score: 0,
      chk: 1,
      comment: '未输入意见'
    },
    selectIndex: "reset"
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
  onLoad: function (options) {
    var _info = this.data.commitData;
    var that = this;
    // _info.tid = options.tid;
    // _info.cid = options.cid;
    // _info.sid = app.globalData.cUser.id;
    that.setData({
      // isSTU: app.globalData.cUser.isSTU,
      commitData: _info,
    });
  },
  saveUserInfo: function () {
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    var that = this;
    for (var num in _chk) {
      if (_chk[num] == -1) {
        wx.showModal({
          title: '提示',
          content: '请选择全部评分项！',
        });
        return;
      }
    }
    wx.showModal({
      title: '提示',
      content: '选择完成后不能修改，确定提交吗？',
      success: function (res) {
        that.setData({
          selectIndex: "reset"
        })
        //var that=this
        console.log(res);
        console.log('提交')
        if (res.confirm) {
          console.log('分数');
          console.log(_info.score)
          app.globalData.fanganScore = _info.score;
          wx.navigateTo({
            url: '../../pages/tuijian/tuijian',
          })
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
  },
  radioChange: function (e) {
    console.log(e);
    var _info = this.data.commitData;
    var _chk = this.data.checked;
    console.log(e.detail.value);
    _chk[parseInt(e.target.dataset.iid)] = util.countScore2(e.detail.value);
    _info.score = 0;
    for (var ss in _chk) {
      if (_chk[ss] == -1)
        _info.score++;
      _info.score += _chk[ss];
    }
    this.setData({
      commitData: _info,
      checked: _chk
    })
    console.log(this);
    console.log(_info);
    console.log(_chk);
  },
  inputComment: function (e) {
    var _info = this.data.commitData;
    if (e.detail.value == '' || e.detail.value == null) {
      return;
    }
    _info.comment = e.detail.value;
    this.setData({
      commitData: _info
    });
  },

})