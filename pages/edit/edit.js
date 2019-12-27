// pages/edit/edit.js
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:'',
      name:'',
      job:'',
      company:'',
      phone:'',
      tpic:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
     if(options.id){
       this.setData({
         id:options.id
       })
      wx.request({
        url: app.globalData.getCard,
        data:{
          openid: wx.getStorageSync('openid')||app.globalData.openid,
          id:options.id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
           if(res.data.status){
             that.setData({
               name:res.data.datalist[0].name,
               job:res.data.datalist[0].job,
               phone:res.data.datalist[0].phone,
               company:res.data.datalist[0].company,
               tpic:res.data.datalist[0].tpic
             })
           } else {
             wx.showModal({
               title: '提示',
               content: res.data.info,
               showCancel: false
             })
           }
        }
      })
     }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  userNameInput:function(e){
    this.setData({
      name: e.detail.value
    })
  },
  jobInput: function (e) {
    this.setData({
      job: e.detail.value
    })
  },
  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  companyInput: function (e) {
    this.setData({
      company: e.detail.value
    })
  },
  addFn:function(){
    var that=this;
    if (util.ifEmpty(this.data.name)) {
      wx.showModal({
        title: '提示',
        content:'名字不能为空',
        showCancel: false
      })
      return false;
    }
    if (util.ifEmpty(this.data.phone)) {
      wx.showModal({
        title: '提示',
        content: '电话号码不能为空!',
        showCancel: false
      })
      return false;
    }
    if (!util.phoneCode(this.data.phone)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号码!',
        showCancel: false
      })
      return false;
    }
    if(this.data.company.length>=20){
      wx.showModal({
        title: '提示',
        content: '公司名称不能超过20个字！',
        showCancel: false
      })
      return false;
    }
    if (this.data.job.length >= 20) {
      wx.showModal({
        title: '提示',
        content: '职位不能超过20个字！',
        showCancel: false
      })
      return false;
    }
    wx.request({
      url: app.globalData.addCard,
      method: 'post',
      data: {
        openid:wx.getStorageSync('openid')||app.globalData.openid,
        id: that.data.id,
        name:that.data.name,
        job:that.data.job,
        company:that.data.company,
        phone:that.data.phone,
        tpic:that.data.tpic
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.status) {
         wx.navigateTo({
           url: '../index/index'
         })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.info,
            showCancel: false
          })
        }
      }
    })
  },
  uploadFn() {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        upload(that, tempFilePaths);
      }
    })
  }
})

function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  });
  wx.uploadFile({
    url: app.globalData.uploadFileUrl,
    filePath: path[0],
    name: 'imgfile',
    formData: {
      //和服务器约定的token, 一般也可以放在header中
      'session_token': wx.getStorageSync('session_token')
    },
    success: function (res) {
      if (res.statusCode != 200) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
        return;
      }
      var data = JSON.parse(res.data);
      page.setData({ //上传成功修改显示头像
        tpic: data.url
      })
    },
    fail: function (e) {
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
    },
    complete: function () {
      wx.hideToast(); //隐藏Toast
    }
  })
}