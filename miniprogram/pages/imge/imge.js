// pages/imge/imge.js
const db = wx.cloud.database()
var util = require('../../utils/util.js')

Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title : '',
    imageUrl:"",
    db_money:0,
    used:0,
    show:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that = this;
    
    that.setData  ({
      title:options.name,
      used:options.money
    });
    var time = util.formatTime(new Date());
    this.setData({
      time:time
    });

   
    db.collection('info').get({
      success:function(res){
        console.log('成功',res);

        that.setData({
          db_money :res.data[0].money
        })
        console.log(dbmoney)

        

      },fall:function(res){
        console.log('获取数据失败')
      }
    });
    
    
    
    
    
    
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var pic = [];
    pic[0] = '../../pns/IMG_6822.JPG';
    pic[1] = '../../pns/IMG_6856.JPG';
    pic[2] = '../../pns/IMG_6895.JPG';
    pic[3] = '../../pns/IMG_6896.JPG';
    pic[4] = '../../pns/IMG_6898.JPG';
    pic[5] = '../../pns/IMG_6899.JPG';
    pic[6] = '../../pns/IMG_6901.JPG';
    pic[7] = '../../pns/IMG_6902.JPG';
    pic[8] = '../../pns/IMG_6903.JPG';
    var randomBgIndex = Math.round( Math.random() * 9);
    this.setData  ({
      imageUrl:pic[randomBgIndex],
    });
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this;
    db.collection('info').doc('e2297d935ebbd32e0090f21f6a6f0d85').update({
      data:{
        money: that.data.db_money-Number((that.data.used))
      },
      
    })
    
    
    
  },

  
  

})