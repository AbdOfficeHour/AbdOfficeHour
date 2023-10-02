// pages/home/home.js

Page({

  // 页面的初始数据
  data: {
    // 使用说明文本
    article_cn_tea: "",
    article_cn_stu: "",
    article_en_tea: "",
    article_en_stu: "",
    article_cn_edu: "",
    
    // 当前准备禁用/启用的元素的状态
    statu: "",

    // 控制禁用按钮的是否可使用(disable)状态
    disable: true,

    // 存储被选中的禁用/启用日期
    selectBanDay: "",

    // 存储被选中的禁用/启用日期索引
    selectBanTimeIndex: -1,

    // 存储被选中的禁用/启用时段
    selectBanTime: "",

    // 用于控制展示“使用说明”弹窗
    show: false,

    // 存储用户姓名
    userName: "",

    // 存储选择教师时用的教师列表
    teacherArray: [],

    // 存储教师办公室列表——中文（索引对应）
    teacherPlace_zh: [],

    // 存储教师办公室列表——英文（索引对应）
    teacherPlace_en: [],

    // 存储被选择的教师在列表中的索引
    index: 0,

    // 存储信息表内的信息
    tableData: [],

    // 存储信息表的表头
    headerData: [],

    // 存储来自数据库的所有时间表信息
    totalTimeTable:[],
    
    // 语言设置，zh_cn为1，en为0
    language: 0, 

    // 权限等级
    credit: 1,
  },

  // bindBanOrAllow 点击禁用/启用此时间段按钮后的触发函数
  // 负责将变更的状态数据上传到云端
  bindBanOrAllow: function(e){
    if (this.data.statu === "⚫️"){
      wx.cloud.callFunction({
        name: "banTime",
        data: {
          // 被选中的日期与时间
          date: this.data.selectBanDay,
          time: this.data.selectBanTime,
          type: 1 // 设置为启用
        },
        success:res => {
          // 重新加载时间表
          this.getTableDataBase()
          console.log("已经设置为启用状态完成")
        },
        fail:err => {
          this.getTableDataBase()
          console.log("设置启用状态异常中止")
        }
      })
    }
    else if (this.data.statu === "✅"){
      wx.cloud.callFunction({
        name: "banTime",
        data: {
          // 被选中的日期与时间
          date: this.data.selectBanDay,
          time: this.data.selectBanTime,
          type: 1 // 设置为禁用
        },
        success:res => {
          // 重新加载时间表
          this.getTableDataBase()
          console.log("已经设置为禁用状态完成")
        },
        fail:err => {
          this.getTableDataBase()
          console.log("设置禁用状态异常中止")
        }
      })
    }
    else{
      console.log("禁用/启用失败")
    }
  },

  // goAppointment 点击预约此时间段按钮后的触发函数
  // 跳转至对应的界面并且页面传参
  goAppointment: function(e){
    var selectDay = this.selectBanDay
    var selectTime = this.selectBanTime
    var selectTeacher = this.teacherArray[this.index]
    console.log(selectDay)
    console.log(selectTime)
    console.log(selectTeacher)
    // 处于🟡和✅的时间段为可预约时间段
    if (this.data.statu === "🟡" || this.data.statu === "✅"){
      // 跳转至appointment界面且传参（选中的日期，时间和教师）
      wx.navigateTo({
        url: "../appointment/appointment?Day=selectDay&Time=selectTime&Teacher=selectTeacher"
      })
    }
    else{
      console.log("预约按钮跳转失败")
    }
  },

  // 点击查看此时间段按钮后的触发函数
  // 跳转至对应的界面
  goAppointmentList: function(e){
    wx.reLaunch({
      // 使用wx.reLaunch的api跳转到tabBar界面
      url: "../appointmentList/appointmentList"
    }) 
  },
  
  // 当选择教师后触发的函数
  // 设置选中的教师且创建时间表
  bindPickerChange: function(e){
    console.log("已选择教师，在教师数组索引为",e.detail.value)
    // 设置index为选择的教师在教师数组中对应的索引
    this.setData({
      index: e.detail.value
    })
    this.createTable() // 按照数据库信息创建时间表
  },

  // 当教师点击表中元素时启用
  // 用于确认选中的教师，日期和时间，同时判断是否可以禁用
  getSelcet: function(e){
    console.log(e.detail)
    this.setData({
      selectBanDay: e.detail.label,
      selectBanTime: e.detail.item.times,
      selectBanTimeIndex: e.detail.line
    })
    for (var i = 0; i < this.data.tableData.length; i++){
      if (i === this.data.selectBanTimeIndex){
        for (var key in this.data.tableData[i]){
          if (key === this.data.selectBanDay){
            // 查询教师所点下的元素，并且识别其状态
            var statu_temp = this.data.tableData[i][key]
            if (statu_temp === "⚫️"){
              this.setData({
                disable: false // 解除按钮禁用
              })
            }
            else if (statu_temp === "✅"){
              this.setData({
                disable: false
              })
            } 
            else if (statu_temp === "🟡"){
              this.setData({
                disable: true // 开启按钮禁用
              })
            }
            else if (statu_temp === "⛔"){
              this.setData({
                disable: true
              })
            }
            else {
              console.log("当前元素不明")
            }
          }
        }
      }
    }
    this.setData({
      statu: statu_temp // 将当前选中的时间段的状态暂存
    })
  },

  // 当学生点击表中元素进行预约时调用
  // 用于确认选中的教师，日期和时间，同时判断是否可以跳转预约
  getSelcet_student: function(e){
    console.log(e.detail)
    this.setData({
      selectBanDay: e.detail.label,
      selectBanTime: e.detail.item.times,
      selectBanTimeIndex: e.detail.line
    })
    for (var i = 0; i < this.data.tableData.length; i++){
      if (i === this.data.selectBanTimeIndex){
        for (var key in this.data.tableData[i]){
          if (key === this.data.selectBanDay){
            // 查询学生所点下的元素，并且识别其状态
            var statu_temp = this.data.tableData[i][key]
            if (statu_temp === "⚫️"){
              this.setData({
                disable: true // 预约按钮不可交互
              })
            }
            else if (statu_temp === "✅"){
              this.setData({
                disable: false // 预约按钮可以交互
              })
            } 
            else if (statu_temp === "🟡"){
              this.setData({
                disable: false
              })
            }
            else if (statu_temp === "⛔"){
              this.setData({
                disable: true
              })
            }
            else {
              console.log("当前元素不明")
            }
          }
        }
      }
    }
    this.setData({
      statu: statu_temp // 将当前选中的时间段的状态暂存
    })
  },

  // 按照时间表信息创建时间表
  // 基本在getTableDataBase函数中被调用，基于最新的信息创建时间表
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
      return "N/A" // 特殊情况，处理错误数据
    }
  },

  // 调用云函数，获取数据库的时间表相关信息
  // 同时也用于实现加载图标，通过wxwx.showLoading
  getTableDataBase: function(){
    wx.showLoading({
      title: 'Loading'
    })
    // 获取教师列表与时间表信息
    wx.cloud.callFunction({
      name: "getTableInfo",
      success:res=>{
        var teacherList_temp = res.result.teacherList
        console.log(res)
        var teacherArray = Array.from(teacherList_temp,({Name})=>Name)
        var teacherPlace_zh = Array.from(teacherList_temp,({zh_cn_place})=>zh_cn_place)
        var teacherPlace_en = Array.from(teacherList_temp,({en_place})=>en_place)
        // 创建三个数组，用于存储教师名字数组，教师办公室地址中文，教师办公室地址英文，使用数组的from方法
        this.setData({
          // 设置教师名字列表
          teacherArray: teacherArray,

          // 设置教师办公室列表中文
          teacherPlace_zh: teacherPlace_zh,

          // 设置教师办公室列表英文
          teacherPlace_en: teacherPlace_en,

          // 展开表达式设置保存教师时间表
          totalTimeTable: [...res.result.timeList],
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
        // 若登录人为教师，更改为教师对应的this.data.index，以确保初始化正确
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
        wx.hideLoading() //加载中图标结束
      },
      fail:err=>{
        console.log(err)
        console.log("获取数据库信息错误")
      }
    })
  },

  // 当任何权限点击使用规则后执行的函数
  getRules(){
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

  // 设置语言文本
  // 将语言文本转换为可以正确显示的markdown格式，使用组件towxml
  set_article(){
    var CN_Stu = "# 阿伯丁学院活动空间使用规则\n\n### 一、总则\n\n1. 阿伯丁学生活动空间包括行政楼 104 学生创新空间和行政楼 106 党团学活动中心。\n2. 行政楼 104 学生创新空间是学院为学生学习提供的场所，主要用于学生自习、小组讨论等学习活动。\n3. 行政楼 106 党团学活动中心是学院为学生活动提供的场所，主要用于举行会议，举办活动等。\n4. 严禁在行政楼104学生创新空间和行政楼106党团学活动中心举行违反党和国家政策、法规或教育行政主管部门规定以及校规校纪的活动。\n5. 行政楼104学生创新空间和行政楼106党团学活动中心使用坚持服务师生的原则, 原则上只供本院师生使用。\n6. 行政楼 106 党团学活动中心的使用由阿伯丁学院学生会和阿伯丁学院活动空间管理员管理统筹调度。\n\n### 二、行政楼 106 党团学活动中心借用要求\n\n1. 行政楼 106 党团学活动中心可供借用的时间为周一至周五 8:30-22:50，周末 8:30-23:20 且有管理员值班的时段。\n2. 行政楼 106 党团学活动中心采用预约制，对学院老师，学生会，团委，社团，团体开放预约。使用者应在活动举办前在值班时间到行政楼 106 党团学活动中心向阿伯丁学院活动空间管理员提交预约申请，以先到先得为原则。\n3. 正常情况下，行政楼 106 党团学活动中心单次预约时间不能超过 3 小时，总预约时长不超过本周总时长的 1/5。使用人数不得低于 3 人。\n4. 使用者应按规定的预约时间进行活动。在不占用其余已预约时间段和有特殊理由的前提下，使用者可在现场延长预约的时间。\n\n### 三、行政楼 106 党团学活动中心的使用规则\n\n1. 未通过上述预约流程进行预约，任何人不得擅自使用行政楼 106 党团学活动中心。\n2. 行政楼 106 党团学活动中心使用遵循“谁使用、谁负责”的原则。违反以下规定者，将进行一次公示警告，三次违规者将永久取消行政楼 106 党团学活动中心使用权。\n3. 行政楼 106 党团学活动中心使用者应自觉维护教室内外环境卫生，不得破坏、私自使用、带走展柜里的物品及装饰物品，爱护教室内设施，不准在教室内乱贴、乱画；不准私自拆卸、刻画桌椅，一经发现警告一次。\n4. 使用多媒体设备，应严格执行操作程序，保证设备安全。禁止私自安装操作系统，禁止下载携带计算机病毒的附件或程序，如有设备损坏则损坏者照价赔偿。\n5. 使用者在使用后复原场地，关闭门窗、空调、电脑、关灯、清理现场垃圾，保证教室干净整洁。违者一经发现，警告一次。\n7. 上课时间借用场地，不可以大声使用音响等设备，避免影响到在学院楼办公的老师及上课的学生，违规者警告一次。\n8. 使用教室时间如发生变更或预定的教室不再使用，需提前通知课室管理员。借用教室迟到半小时或无故不使用者，警告一次。\n9. 原则上使用者不得在教室存放个人用品，不得恶意占座。如因本人遗留而造成的物品丢失，责任自负。\n10. 一切解释权归阿伯丁数据科学与人工智能学院学生会所有。\n点击左上角关闭此页面则表示您已知悉该规定。\n\n"
    var EN_Stu = "#Title\n###text1\nt###text2"
    var CN_Tea = "# 阿伯丁学院活动空间使用规则\n\n### 一、总则\n\n1. 阿伯丁学生活动空间包括行政楼 104 学生创新空间和行政楼 106 党团学活动中心。\n2. 行政楼 104 学生创新空间是学院为学生学习提供的场所，主要用于学生自习、小组讨论等学习活动。\n3. 行政楼 106 党团学活动中心是学院为学生活动提供的场所，主要用于举行会议，举办活动等。\n4. 严禁在行政楼104学生创新空间和行政楼106党团学活动中心举行违反党和国家政策、法规或教育行政主管部门规定以及校规校纪的活动。\n5. 行政楼104学生创新空间和行政楼106党团学活动中心使用坚持服务师生的原则, 原则上只供本院师生使用。\n6. 行政楼 106 党团学活动中心的使用由阿伯丁学院学生会和阿伯丁学院活动空间管理员管理统筹调度。\n\n### 二、行政楼 106 党团学活动中心借用要求\n\n1. 行政楼 106 党团学活动中心可供借用的时间为周一至周五 8:30-22:50，周末 8:30-23:20 且有管理员值班的时段。\n2. 行政楼 106 党团学活动中心采用预约制，对学院老师，学生会，团委，社团，团体开放预约。使用者应在活动举办前在值班时间到行政楼 106 党团学活动中心向阿伯丁学院活动空间管理员提交预约申请，以先到先得为原则。\n3. 正常情况下，行政楼 106 党团学活动中心单次预约时间不能超过 3 小时，总预约时长不超过本周总时长的 1/5。使用人数不得低于 3 人。\n4. 使用者应按规定的预约时间进行活动。在不占用其余已预约时间段和有特殊理由的前提下，使用者可在现场延长预约的时间。\n\n### 三、行政楼 106 党团学活动中心的使用规则\n\n1. 未通过上述预约流程进行预约，任何人不得擅自使用行政楼 106 党团学活动中心。\n2. 行政楼 106 党团学活动中心使用遵循“谁使用、谁负责”的原则。违反以下规定者，将进行一次公示警告，三次违规者将永久取消行政楼 106 党团学活动中心使用权。\n3. 行政楼 106 党团学活动中心使用者应自觉维护教室内外环境卫生，不得破坏、私自使用、带走展柜里的物品及装饰物品，爱护教室内设施，不准在教室内乱贴、乱画；不准私自拆卸、刻画桌椅，一经发现警告一次。\n4. 使用多媒体设备，应严格执行操作程序，保证设备安全。禁止私自安装操作系统，禁止下载携带计算机病毒的附件或程序，如有设备损坏则损坏者照价赔偿。\n5. 使用者在使用后复原场地，关闭门窗、空调、电脑、关灯、清理现场垃圾，保证教室干净整洁。违者一经发现，警告一次。\n7. 上课时间借用场地，不可以大声使用音响等设备，避免影响到在学院楼办公的老师及上课的学生，违规者警告一次。\n8. 使用教室时间如发生变更或预定的教室不再使用，需提前通知课室管理员。借用教室迟到半小时或无故不使用者，警告一次。\n9. 原则上使用者不得在教室存放个人用品，不得恶意占座。如因本人遗留而造成的物品丢失，责任自负。\n10. 一切解释权归阿伯丁数据科学与人工智能学院学生会所有。\n点击左上角关闭此页面则表示您已知悉该规定。\n\n"
    var EN_Tea = "#Title\n###text1\nt###text2" 
    var CN_Edu = "???"
    const app = getApp()
    var result_CN_Stu = app.towxml(CN_Stu,'markdown')
    var result_EN_Stu = app.towxml(EN_Stu,'markdown')
    var result_CN_Tea = app.towxml(CN_Tea,'markdown')
    var result_EN_Tea = app.towxml(EN_Tea,'markdown')
    var result_CN_Edu = app.towxml(CN_Edu,'markdown')
    this.setData({
      article_cn_stu: result_CN_Stu,
      article_en_stu: result_EN_Stu,
      article_cn_tea: result_CN_Tea,
      article_en_tea: result_EN_Tea,
      article_cn_edu: result_CN_Edu
    })
  },

  // 生命周期函数--监听页面加载
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

    // 设置使用说明文本
    this.set_article()

    // 为了避免个人信息界面设置语言后没有更新，调用云的语言信息
    wx.cloud.callFunction({
      name: "getLanguage",
      success:res=>{
        this.setData({
          language: res.result.language
        })
      }
    })
  },

  
  // 生命周期函数--监听页面初次渲染完成
  onReady() {

  },

  
  //生命周期函数--监听页面显示
  onShow() {
    // 获取教师列表与时间表信息
    this.getTableDataBase()
    // 为了避免个人信息界面设置语言后没有更新，调用缓存语言信息的同时调用云数据库的语言信息
    wx.getStorageSync('language')
    wx.cloud.callFunction({
      name: "getLanguage",
      success:res=>{
        this.setData({
          language: res.result.language
        })
      }
    })
  },

  //生命周期函数--监听页面隐藏
  onHide() {

  },

  //生命周期函数--监听页面卸载
  onUnload() {

  },

  // 页面相关事件处理函数--监听用户下拉动作
  // 下拉刷新功能
  onPullDownRefresh() {
    // 获取教师列表与时间表信息
    this.getTableDataBase()
    // 停止刷新动画演示
    wx.stopPullDownRefresh()
    // 加载中界面Off
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {

  },

  // 用户点击右上角分享
  onShareAppMessage() {

  }
})