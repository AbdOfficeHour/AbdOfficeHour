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
    state1: false,//现在老师信息没填
    state2: false,//现在日期没填
    state3: false,//现在时间没填
    
    appoint:{},
    teacher: "",
    day: "",
    hour: "",
    tips: "",
  },


//这是按下按钮之后的函数，按理来说上传数据也应该从这走
  goTo:function(){
    var state = this.data.state1&&this.data.state2&&this.data.state3;
    if (state)
    { 
      wx.switchTab({
        url: '../home/home'
      })
      console.log(this.data.tips)
    }
  },

  bindPickerChange1: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
    })
    console.log(this.data.array[e.detail.value])
    this.setData({
      teacher: this.data.array[e.detail.value],
      state1: true,
    })
  },



  bindPickerChange2: function (e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    console.log(this.data.date[e.detail.value])
    this.setData({
      day: this.data.date[e.detail.value],
      state2: true,
    })
  },

  bindPickerChange3: function (e) {
    console.log('picker3发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
    console.log(this.data.time[e.detail.value])
    this.setData({
      hour: this.data.time[e.detail.value],
      state3: true,
    })
  },

  getValue(e){
    this.setData({
      tips: e.detail,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //先调用云函数把老师都存进一个数组
    var array1 = new Array();
    
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