//app.js
App({
  onLaunch: function () {
    var access_token = wx.getStorageSync('access_token');
    var expire_in = wx.getStorageSync('expire_in');
   // var access_token = parse;
    var access_token_date = parseInt(wx.getStorageSync('access_token_date'));
    var now = new Date().getTime();
    if(!access_token){
      this.requestToken();
 
    } else if(now > access_token_date + expire_in){
      this.requestToken();
    }else{
 
    }
  
 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
 
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
 
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
  },
  globalData: {
    userInfo: null
  },
 
  requestToken() {
    var that = this;
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        // aaa那里填写自己的百度key值
        client_id: 'G6IUqftzG0c7jvUkk0G7tXjw',
        client_secret: 'Zdz3s55HzzxxGFQ18plapZ6taEn2h7Sg'
 
      },
      //header: {'content-type': 'application/json'},
      header: {'content-type': 'application/x-www-form-urlencoded'},
      success (res) {
        if(res.statusCode == 200){
          wx.setStorageSync("access_token", res.data.access_token);
          wx.setStorageSync("expires_in", res.data.expires_in);
          //wx.setStorageSync("access_token_date", res.data.access_token_date);
          wx.setStorageSync("access_token_date", new Date().getTime());
          that.globalData.access_token = res.data.access_token;
        }
      }
    })
  }
})
