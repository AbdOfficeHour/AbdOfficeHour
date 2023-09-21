// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 选择教师时的教师列表
    teacherArray: [],

    // 选择的教师在列表中的索引
    index: 0,

    // 信息表内的信息
    tableData: [],
    // tableData_example: [{
    //   "times": "14:00-14:30",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // },{
    //   "times": "14:30-15:00",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // },{
    //   "times": "15:00-15:30",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // },{
    //   "times": "15:30-16:00",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // },{
    //   "times": "16:00-16:30",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // },{
    //   "times": "16:30-17:00",
    //   "21/09": "⛔",
    //   "28/09": "⛔"
    // }],

    // 信息表的表头
    headerData: [],
    // headerData_example: [{
    //   prop: "times",
    //   label: "时间"
    // },{
    //   prop: "21/09",
    //   label: "21/09"
    // },{
    //   prop: "28/09",
    //   label: "28/09"
    // }],

    // 接受数据库的所有时间表信息
    totalTimeTable:[],
    
    language: 0, //语言，zh_cn为1，en为0
    credit: 0 // 权限等级
  },
  
  // 当选择教师后触发的函数
  bindPickerChange: function(e){
    console.log("已选择教师，在教师数组索引为",e.detail.value)
    // 设置index为选择的教师对应的索引
    this.setData({
      index: e.detail.value
    })
    this.createTable() // 按照数据库信息创建时间表
  },

  // 按照数据库信息创建时间表
  createTable: function(){
    var sourceTableData = this.data.totalTimeTable[this.data.index] // 用于暂时保存当前选择教师的时间表
    console.log(this.data.totalTimeTable)
    // temp_headerData用于暂时存储准备用于渲染的headerData，下面是对数据的处理
    var temp_headerData = [{
      prop: "times",
      label: "Times"
    }]
    for (var i = 0; i < sourceTableData.headerDate.length; i++){
      temp_headerData.push({
        prop: sourceTableData.headerDate[i],
        label: sourceTableData.headerDate[i]
      })
    }
    // 设置用于渲染的headerData数据
    this.setData({
      headerData: temp_headerData
    })
    // temp_tableData用于暂时存储准备用于渲染的headerData，下面是对数据的处理
    var temp_tableData = []
    for (var i = 0; i < sourceTableData.tableDate.length; i++){ // 第一重遍历，确定是第几行的数据
      var temp_eachTableData = {times: sourceTableData.tableDate[i].time} // tableData中的每个对象
      for (var j = 0; j < sourceTableData.tableDate[i].status.length; j++){ //第二重遍历，确定status存储的状态数字
          var temp_key = sourceTableData.headerDate[j]
          temp_eachTableData[temp_key] = this.getEmoji(sourceTableData.tableDate[i].status[j])
          // 通过getEmoji将状态数字转为状态Emoji
      }  
      temp_tableData.push(temp_eachTableData) // 将本行数据添加到temp_tableData
    }

    // 设置用于渲染的headerData数据
    this.setData({
      tableData: temp_tableData
    })
  },

  // 将data.totalTimeTable中的状态数字修改为显示用的emoji
  getEmoji: function(statu){
    if (statu === 0){
      return "⚫️"
    }
    else if (statu === 1){
      return "✅"
    }
    else if (statu === 2){
      return "🟡"
    }
    else if(statu === 3){
      return "⛔"
    }
    else{
      return "N/A"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户的权限信息，赋值给credit
    wx.cloud.callFunction({
      name: "getCredit",
      success:res=>{
        console.log(res)
        this.setData({
          credit: res.result.Credit
        })
      },
      fail:res=>{
        console.log("权限信息获取失败")
      }
    })
    // 获取用户的语言信息，赋值给language
    wx.cloud.callFunction({
      name: "getLanguage",
      success:res=>{
        console.log(res)
        this.setData({
          language: res.result.language
        })
      },
      fail:res=>{
        console.log("语言信息获取失败")
      }
    })
    // 获取教师列表与时间表信息
    wx.cloud.callFunction({
      name: "getTableInfo",
      success:res=>{
        console.log(res)
        this.setData({
          // 设置教师列表
          teacherArray: res.result.teacherList,
          // 展开表达式设置保存教师时间表
          totalTimeTable: [...res.result.timeList]
          // 后端已经确保teacherArray和totalTimeTable的索引一一对应
        })
        this.createTable() // 由于异步的原因，这里应当放在回调函数里面
      },
      fail:err=>{
        console.log("获取时间表信息失败")
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