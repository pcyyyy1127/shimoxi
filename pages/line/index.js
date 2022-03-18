
import * as echarts from '../../ec-canvas/echarts';

Page({
  title: {
    text: '药物释放情况',
    left: 'center'
  },
  data: {
    ecBar: {
      lazyLoad: true // 延迟加载
    },
    xdata: [],
    ydata: [],

   /* ecScatter: {
      lazyLoad: true
    }*/
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
  onLoad() {
    this.barComponent = this.selectComponent('#mychart-dom-multi-bar');
    this.scaComponnet = this.selectComponent('#mychart-dom-multi-scatter');
    this.init_bar();
    this.init_sca();
    var xAxis = wx.getStorageSync('xAxis_1');
    if (xAxis < 30) {
      this.data.xdata = ['0', '0.5h'];
      this.data.ydata = [0, 17.66];
    }
    else {
      this.data.xdata = ['0', '0.5h', '1h'];
      this.data.ydata = [0, 17.66, 24.1];
    }
  },
  init_bar: function () {
    this.barComponent.init((canvas, width, height) => {
      // 初始化图表
      const barChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      barChart.setOption(this.getBarOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return barChart;
    });
  },
  init_sca: function () {
    this.scaComponnet.init((canvas, width, height) => {
      // 初始化图表
      const scaChart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      scaChart.setOption(this.getScaOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return scaChart;
    });
  },
  getBarOption: function () {
    //return 请求数据
    return {
      color: ['#37a2da',],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['药物释放情况(ug)']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: this.data.xdata,
          fontSize: 16
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },

          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 16
          }
        }
      ],
      series: [
        {
          name: '药物释放情况(ug)',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: this.data.ydata,
        },


      ]
    };
  },
  getScaOption: function () {
    //请求数据 
    var data = [];
    var data2 = [];

    for (var i = 0; i < 10; i++) {
      data.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 40)
        ]
      );
      data2.push(
        [
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100),
          Math.round(Math.random() * 100)
        ]
      );
    }

    /*var axisCommon = {
      axisLabel: {
        textStyle: {
          color: '#C8C8C8'
        }
      },
      axisTick: {
        lineStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        lineStyle: {
          color: '#C8C8C8'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#C8C8C8',
          type: 'solid'
        }
      }
    };*/

    return {
      color: ["#FF7070", "#60B6E3"],
      backgroundColor: '#eee',
      // xAxis: axisCommon,
      // yAxis: axisCommon,
      /*legend: {
        data: ['aaaa', 'bbbb']
      },
      visualMap: {
        show: false,
        max: 100,
        inRange: {
          symbolSize: [20, 70]
        }
      },*/
      /*series: [{
        type: 'line',
        name: 'aaaa',
        data: data
      },
      {
        name: 'bbbb',
        type: 'line',
        data: data2
      }
      ],*/
      animationDelay: function (idx) {
        return idx * 50;
      },
      animationEasing: 'elasticOut'
    };
  },
});