
var app = getApp()

Page({
  data: {
    hideVerifyPhone: true,
    hideBindNewPhone: true,
    oldCode: '',
    oldCodeBtnDisabled: false,
    oldCodeStatus: '获取验证码',
    nextStepDisabled: false,
    newPhone: '',
    newCode: '',
    newCodeBtnDisabled: false,
    newCodeStatus: '获取验证码',
    bindNewPhoneBtnDisabled: false,
    codeInterval: 60,
    oldPhonePicCodeUrl: '',
    newPhonePicCodeUrl: ''
  },
  oldPhonePicCode: '',
  newPhonePicCode: '',
  formerPageRouter: ''
  

})
