// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择教师时的教师列表
    teacherArray: [
      "Aladdin Ayesh",
      "Binod Bhattarai",
      "Tianhong Dai",
      "Xiao Li",
      "Thuan Chuah",
      "Yongchao Huang",
      "马文俊",
      "杜志斌",
      "吴小丽",
      "吴婧雅",
      "教学事务办公室",
      "学生工作办公室",
      "学生创新空间"
    ],
    // 选择的教师在列表中的索引
    // 默认为教学事务办公室
    index: 10,
    // 信息表内的信息
    tableData: [{
      "times": "14:00-14:30",
      "status_0": "⛔",
      "status_1": "⛔"
    },{
      "times": "14:30-15:00",
      "status_0": "⛔",
      "status_1": "⛔"
    },{
      "times": "15:00-15:30",
      "status_0": "⛔",
      "status_1": "⛔"
    },{
      "times": "15:30-16:00",
      "status_0": "⛔",
      "status_1": "⛔"
    },{
      "times": "16:00-16:30",
      "status_0": "⛔",
      "status_1": "⛔"
    },{
      "times": "16:30-17:00",
      "status_0": "⛔",
      "status_1": "⛔"
    }],
    // 信息表的表头
    headerData: [{
      prop: "times",
      label: "时间"
    },{
      prop: "status_0",
      label: "本周"
    },{
      prop: "status_1",
      label: "下周"
    }
    ],
    language: 0, //zh_cn为1，en为0
    credit: 1 // 权限等级
  },
  
  // 当选择教师后触发的函数
  bindPickerChange: function(e){
    console.log("picker发送选择改变，携带值为",e.detail.value)
    this.setData({
      index: e.detail.value
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
    wx.stopPullDownRefresh()
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