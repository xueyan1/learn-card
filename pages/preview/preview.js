// pages/preview/preview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:3,
    tpic:'',
    name:'赵恩华',
    job:'销售',
    phone:'15236569856',
    company:'深圳少华有限公司'
  },
  onLoad: function (options) {
    var that = this;
    if (options.id) {
      this.setData({
        id: options.id
      })
      wx.request({
        url: app.globalData.getCard,
        data: {
          id: options.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.status) {
            that.setData({
              name: res.data.datalist[0].name,
              job: res.data.datalist[0].job,
              phone: res.data.datalist[0].phone,
              company: res.data.datalist[0].company,
              tpic: res.data.datalist[0].tpic
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
  },
  editFn:function(){
    wx.navigateTo({
      url: '../edit/edit?id='+this.data.id,
    })
  }
})