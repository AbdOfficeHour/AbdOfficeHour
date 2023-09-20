// pages/appointmentList/appointmentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: true, //无预约时为TRUE，默认true
    zh_cn: 1,
    credit: 1,
    list:[],//存放预约记录
    test: true,
  },
  
  goTo:function(){
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /**发送本地openid，云函数上传*/
    /**学生和老师都需要读取相同的信息 */
    /**step1：看看有多少次*/
    var count = "5";
    var appoint = new Array();
    /**step2：for循环,调用云函数*/
    for (var i = 0; i < count; i++)
    {
      appoint[i]={
        std_name : "Mingzhe Yang",
        std_tele  : "1860000000",
        teacher: "Ruizhe Li",
        date : "9.21",
        time: "14:00-14:30",
        tips:"这是一段注释",
      };
      this.setData({
        list: appoint[i],
      })
    }

    if(count > 0){
      this.setData({
        items: false,
      })
    }
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