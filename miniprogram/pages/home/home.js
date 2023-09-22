// pages/home/home.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制加载弹窗
    loading: false,

    // 控制展示“使用方法”弹窗
    show: false,

    // 用户姓名
    userName: "",

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
    //   type: 3,
    //   prop: "times",
    //   label: "时间",
    //   buttons: [{
    //      text: "⛔"
    //      col: "日期"
    //      
    //   }]
    // },{
    //   prop: "21/09",
    //   label: "21/09"
    // },{
    //   prop: "28/09",
    //   label: "28/09"
    // }],

    // 接受数据库的所有时间表信息
    totalTimeTable:[],
    
    //语言，zh_cn为1，en为0
    language: 0, 

    // 权限等级
    credit: 1,

    // 教师端中文使用说明
    cn_teacher_text: [
      "1. 如果您在某个Office Hour时间段比较繁忙，您可以禁用该时间段来避免学生预约此时间段。",
      "禁用功能的具体使用方法如下：",
      "对于✅绿色的图标，您可以轻点该图标，将其设置为⚫️禁用时间段；",
      "对于⚫️黑色的图标，您可以轻点该图标，将其设置为✅可预约时段；",
      "对于🟡黄色的图标，您不可以将其设置为⚫️禁用时间段，您需要先处理该预约申请，待其变回✅绿色后，再禁用；",
      "对于⛔红色的图标，您不可以将其设置为⚫️禁用时间段。"
    ],

    // 教师端英文使用说明
    en_teacher_text: [

    ],

    // 学生端中文使用说明
    cn_student_text: [

    ],

    // 学生端英文使用说明
    en_student_text: [

    ],
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

  getSelcet: function(e){
    console.log(e)
  },

  // 按照数据库信息创建时间表
  createTable: function(){
    var sourceTableData = this.data.totalTimeTable[this.data.index] // 用于暂时保存当前选择教师的时间表
    console.log(this.data.totalTimeTable)
    // temp_headerData用于暂时存储准备用于渲染的headerData，下面是对数据的处理
    var temp_headerData = [{
      prop: "times",
      label: "Times",
    }]
    for (var i = 0; i < sourceTableData.headerDate.length; i++){
      temp_headerData.push({
        prop: sourceTableData.headerDate[i],
        label: sourceTableData.headerDate[i],
        type: 3,
      button: [{
        text: "",
        col: sourceTableData.headerDate[i]
      }]
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

  getTableDataBase: function(){
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
        try{
          var temp_name = wx.getStorageSync("Name")
          this.setData({
            userName: temp_name
          })
        }catch(e){
          console.log("姓名获取错误")
        }
        // 若登录人为教师，更改为教师对应的this.data.index
        if (this.data.credit === 2 || this.data.credit === 4){
          for (var i = 0; i < this.data.teacherArray.length; i++){
            if (this.data.teacherArray[i] === this.data.userName){
              this.setData({
                index: i
              })
            }
          }
        }
        this.createTable() // 由于异步的原因，这里应当放在回调函数里面
      },
    })
  },

  // 当学生点击使用规则后执行的函数
  getRulesStudent(){
    this.showPopup()
  },

  // 当教师点击使用规则后执行的函数
  getRulesTeacher(){
    this.showPopup()
  },

  // 展示Pop_up弹窗
  showPopup(){
    this.setData({
      show: true
    })
  },

  // 关闭Pop_up弹窗
  closePopup(){
    this.setData({
      show: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取用户的权限信息，赋值给credit
    try{
      var temp_credit = wx.getStorageSync("Credit")
      this.setData({
        credit: temp_credit
      })
    }catch(e){
      console.log("权限获取错误")
    }
    
    // 获取用户的语言信息，赋值给language
    try{
      var temp_language = wx.getStorageSync("language")
      this.setData({
        language: temp_language
      })
    }catch(e){
      console.log("权限获取错误")
    }
    // 获取教师列表与时间表信息
    this.getTableDataBase()
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
    // 获取教师列表与时间表信息
    this.getTableDataBase()
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
    // 获取教师列表与时间表信息
    this.getTableDataBase()
    // 停止刷新动画演示
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