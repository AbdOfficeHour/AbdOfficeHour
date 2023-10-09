// pages/messageBoard/messageBoard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    communication:"",
    language:1
  },

  onChangeMessage(e){
    this.setData({
      message:e.detail.value
    })
  },

  onChangeCommunication(e){
    this.setData({
      communication:e.detail.value
    })
  },

  //提交功能
  submit(){
    wx.cloud.callFunction({
      name:"sendEmail",
      data:{
        to:"20223803065@m.scnu.edu.cn",
        subject:"OfficeHour bug反馈",
        text:`反馈内容：\n${this.data.message}\n\n联系方式：${this.data.communication}`
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      language:wx.getStorageSync('language')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})