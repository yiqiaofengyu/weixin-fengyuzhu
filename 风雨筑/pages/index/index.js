var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  funcClick: function() {
    wx.navigateTo({
      url: '../func/func',
    })
  },
  
  aboutClick: function() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
})