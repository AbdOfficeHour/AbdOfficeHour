Page({

  /**
   * 页面的初始数据
   */
  data: {
    zh_cn: 1,
  //picker 测试
    array: ['美国', '中国', '巴西', '日本'],
    date: ['9.21','9.28'],
    time: ['14:00-14:30','14:30-15:00','15:00-15:30'],
  //下面是数据类型
    name: "Li Yuanfang",
    phone: "18600000000",
    state: false,//现在他还没有填写任何信息
  },



  goTo:function(){
    if (this.data.state)
    { 
      wx.switchTab({
        url: '../home/home'
      });
    }
  },

  bindPickerChange1: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },

  bindPickerChange2: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker3发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
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
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})