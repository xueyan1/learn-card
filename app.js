//app.js
App({
  onShow: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        var appid = 'wxc08a0e19e9f89a47';
        var secret = '532595d06d10ec9ca4fee8e8fbbbca3a';
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + code,
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data.openid); // openid
            that.globalData.openid = res.data.openid;
            wx.setStorage({
              key: 'openid',
              data: res.data.openid
            })
          }
        })
      }
    })
  },
  globalData: {
    'openid':'',
    'uploadFileUrl': 'http://127.0.0.1:18080/uploadfile',
    'getCard':'http://127.0.0.1:18080/card/getcard',
    'addCard':'http://127.0.0.1:18080/card/addcard'
  }
})