//index.jsconst app = getApp()
Page({ 
  data: {    
   avatarUrl: './user-unlogin.png',    
   userInfo: {},    
   logged: false,    
   takeSession: false,    
   requestResult: '',
     
   valueIsShow: false,    
   value:'',    
   valueTest:'',    
   ispassword: true
 /* 设置密码和判断密码是否正确的值 */    },
   onLoad: function() {
    if (!wx.cloud) {     
     wx.redirectTo({        
       url: '../../pages/index/index',      
       })      
     return    
     }
     // 获取用户信息    
     wx.getSetting({     
      success: res => {       
       if (res.authSetting['scope.userInfo']) {          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框         
        wx.getUserInfo({            
         success: res => {             
          this.setData({               
           avatarUrl: res.userInfo.avatarUrl,                
           userInfo: res.userInfo              
           })            
          }          
         })       
        }      
       }    
      })  
     },
   onGetUserInfo: function(e) {   
    if (!this.logged && e.detail.userInfo) {     
     this.setData({       
      logged: true,        
      avatarUrl: e.detail.userInfo.avatarUrl,        
      userInfo: e.detail.userInfo     
      })    
     }  
    },
 
   onEnter: function (e) {   
    let valueTest = this.data.valueTest    
    console.log(valueTest)    
    if(valueTest == '0'){     
     wx.switchTab({       
      url: '../../pages/index/index'    
      })      
     wx.showToast({       
      title: '是我的瓜瓜～',       
      icon: '是我的瓜瓜～',        
      duration: 2000      
      })    
     }    
     else{     
      wx.showToast({        
       title: '你这个坏人',        
       icon: 'none',        
       duration: 2000      
       })    
      }         
     },/* 设置if进行条件判断，用valueTest的值对密码是否正确进行判定，此处valueTest值为‘0’时实现跳转，否则提示输入失败，重新输入 */
     
  toggleValue() {   
    this.setData({     
     valueIsShow: !this.data.valueIsShow,      
     ispassword: !this.data.ispassword    
     })  
    },    /* 此处设置是否显示密码，返回wxml，返回值false和true */
 
  saveInputValue:function(e) {   
     let value = e.detail.value    
     console.log(value)    
     if (value == '0727') {/* 等号后面即为设定的密码，此处密码为c851038595 */       
      this.data.valueTest = '0'    
      }    
     else{     
      this.data.valueTest = '1'    
      } 
    },
 })/* 此处设置密码值value并进行判断，若密码值正确，则判定值为‘0’，并在onEnter中实现成功跳转，否则报错 */
