//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cardlist: [{ id: 1, name: '赵恩华', job: '销售', company: '深圳少华有限公司', phone: '15036895623' }, { id: 2, name: '赵恩华', job: '销售', company: '深圳少华有限公司', phone: '15036895623' }]
  },
  //事件处理函数
  goAdd: function(event) {
    wx.navigateTo({
      url: '../edit/edit'
    })
  },
  goPreview: function (event){
    var id = event.currentTarget.dataset.id ;
    wx.navigateTo({
      url: '../preview/preview?id='+id
    })
  },
  onLoad: function() {
    var that=this;
    wx.request({
      url: app.globalData.getCard,
      data:{
        openid: wx.getStorageSync('openid')||app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {  
        if(res.data.status){
          that.setData({
            cardlist: res.data.datalist
          })
        }else{
          wx.showModal({
            title: '提示',
            content:res.data.info,
            showCancel: false
          })
        }
      }
    })
  }
})