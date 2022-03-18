function formatTime(date) {
  if (!date) {
    date = new Date();
  }

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatDistance(distance) {
  distance = +distance;
  return distance < 1000 ? Math.round(distance) + 'm' : (distance / 1000).toFixed(1) + 'km';
}

function isPlainObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

function isPhoneNumber(num) {
  return /^1\d{3}$/.test(num);
}

/*获取当前页url*/
function getCurrentPageUrl() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  var options = currentPage.options;
  var urlWithArgs = url + '?';
  for (var key in options) {
    var value = options[key];
    urlWithArgs += key + '=' + value + '&';
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
  return urlWithArgs;
}
const getScore = function (num) {
  var score = 0;
  switch (num) {
    case '0':
      score = 5;
      break;
    case '1':
      score = 4;
      break;
    case '2':
      score = 3;
      break;
    case '3':
      score = 2;
      break;
    case '4':
      score = 1;
      break;
    case '5':
      score = 0;
      break;
  }
  return score;
}

const getScore2 = function (num) {
  var score = 0;
  switch (num) {
    case '0':
      score = 0;
      break;
    case '1':
      score = 1;
      break;
    case '2':
      score = 2;
      break;
    case '3':
      score = 3;
      break;
    case '4':
      score = 4;
      break;
    case '5':
      score = 5;
      break;
    case '6':
      score = 6;
      break;
    case '7':
      score = 7;
      break;
    case '8':
      score = 8;
      break;
    case '9':
      score = 9;
      break;

  }
  return score;

}

// function checkLogin() {
//   var state = true;
//   if (!wx.getStorageSync("username") && !wx.getStorageSync('avatarUrl') && !wx.getStorageSync('openid')) {
//     wx.showModal({
//       title: '中医智能敷贴',
//       content: '未登录，前往登录',
//       showCancel: true,
//       cancelText: '取消',
//       cancelColor: '#000000',
//       confirmText: '确定',
//       confirmColor: '#3CC51F',
//       success: (result) => {
//         if (result.confirm) {
//           wx.navigateTo({
//             url: '../login/login',
//             success: (result) => {

//             },
//             fail: () => {
//               state = false;
//             },
//             complete: () => {}
//           });
//         } else {
//           state = false;
//         }
//       },
//       fail: () => {},
//       complete: () => {}
//     });
//   } else {
//     //查看是否授权
//     var p1 = new Promise(function (resolve, reject) {
//       wx.getSetting({
//         success: function (res) {
//           if (res.authSetting['scope.userInfo']) {
//             resolve();
//           }
//         }
//       });
//     });
//     var p2 = new Promise(function (resolve, reject) {
//       wx.checkSession({
//         success: function () {
//           resolve(true);
//         },
//         fail: function () {
//           wx.showModal({
//             title: '中医智能敷贴',
//             content: '登录失效，重新登录',
//             showCancel: true,
//             cancelText: '取消',
//             cancelColor: '#000000',
//             confirmText: '确定',
//             confirmColor: '#3CC51F',
//             success: (result) => {
//               if(result.confirm){
//                 wx.navigateTo({
//                   url: '../login/login',
//                   success: (result)=>{

//                   },
//                   fail: ()=>{},
//                   complete: ()=>{}
//                 });
//               }
//             },
//             fail: ()=>{},
//             complete: ()=>{}
//           });
//         }
//       })
//     });
//     var result=p1.then(function () {
//       return p2;
//     }).then(function (res) {
//       return res;
//     }).catch(function (err) {
//       console.log(err);
//     })
//     return result;
//   }
// }


function checkLogin(callbackSucc, callbackErr) {
  
    wx.checkSession({
      success: (result) => {
        if (checkStorage) {
          callbackSucc(true);
        } else {
          callbackErr(false)
        }
      },
      fail: () => {
        callbackErr(false)
      },
      complete: () => {}
    });
}

function showModal(title, content, url, callback) {
  wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#000000',
    confirmText: '确定',
    confirmColor: '#3CC51F',
    success: (result) => {
      if (result.confirm) {
        wx.navigateTo({
          url: url,
          success: (result) => {

          },
          fail: () => {},
          complete: () => {}
        });
      } else {
        callback();
      }
    },
    fail: () => {},
    complete: () => {}
  });
}

function checkStorage() {
  if (!wx.getStorageSync("username") && !wx.getStorageSync('avatarUrl') && !wx.getStorageSync('openid')) {
    return true;
  } else {
    return false
  }
}

module.exports = {
  countScore: getScore,
  countScore2: getScore2,
  formatTime: formatTime,
  isPlainObject: isPlainObject,
  isPhoneNumber: isPhoneNumber,
  formatDistance: formatDistance,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  checkLogin: checkLogin,
  checkStorage: checkStorage,
  showModal: showModal
}