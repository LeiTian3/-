//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    month:null
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    const db = wx.cloud.database()
    let that = this 
    db.collection('info').get({
      success:function(res){
        console.log('成功',res)
          that.setData({
            motto:res.data[0].money,
            month:res.data[0].month

          })
      },fall:function(res){
        console.log('获取数据失败')
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var date1 = new Date("2018-09-14")  
    var date2 = new Date(); //当前时间
    var differtime = parseInt((date2 - date1) / (1000 * 60 * 60 * 24))
    this.setData({
      mytime:differtime
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //自动更新瓜币
  updat:function(){
    
  }
  
    
})
