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
    wx.showLoading({
      title: 'Loading'
    })
    wx.cloud.callFunction({
      name:"sendEmail",
      data:{
        to:"20223803065@m.scnu.edu.cn",
        subject:"OfficeHour bug反馈",
        text:`反馈内容：\n${this.data.message}\n\n联系方式：${this.data.communication}`
      },
      success: res => {
        console.log(res)
        wx.showModal({
          title: this.data.language ? "提交成功" : "Submit Successfully"
        })
        wx.hideLoading()
      },
      fail: err => {
        console.log(err)
        wx.showModal({
          title:  this.data.language ? "提交失败" : "Submit Failure"
        })
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.cloud.callFunction({
      name: "checkuserexist",
      success:res=>{
        console.log(res)
        let exist_flag = res.result.result
        if (exist_flag == 1){
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      },
      fail:err=>{
        console.log(err)
        console.log("检查用户失败")
      }
    })
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
  onShareAppMessage: function () {
  //   return {
  //     title: 'ABDN Office Hour',
  //     path: '/pages/login/login',
  //     promise 
  //   }
  }
})