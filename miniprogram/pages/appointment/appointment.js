let toast;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zh_cn: 1,
    //结果告知弹框
    visible: false,
	  buttons: [{
		text: 'OK',
		color: '#FF2B2B'
	}],
  //picker 测试
    array: [],
    date: [],
    time: [],
    dateTime: {},
  //下面是数据类型
    name: "",
    phone: "",
    state1: false,//现在老师信息没填
    state2: false,//现在日期没填
    state3: false,//现在时间没填
    
    appoint:{},
    teacher: "",
    day: "",
    hour: "",
    tips: "",
    success:"",
    message:"",
  },
  


  get_lang(){
    wx.cloud.callFunction({
      name: 'getLanguage',    //这里写云函数名称
      data: "",
      
      success:res=>{
          this.setData({
            zh_cn:res.result.language
          })//这里是成功的回调函数
      },
      fail:err=>{
          //这里是失败的回调函数
      }
    })
  },

  add_appoint(){
    wx.cloud.callFunction({
      name: 'addEvent',    //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
      success:res=>{
          //这里是成功的回调函数
      },
      fail:err=>{
          //这里是失败的回调函数
      }
    })
  },


  //拿取name和tele的函数
  get_user(){
    wx.cloud.callFunction({
      name: 'getUserInfo',   //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
      success:res=>{
          this.setData({
            name:res.result.name,
            phone:res.result.phoneNum
            
          })//这里是成功的回调函数
      },
      fail:err=>{
          console.log("读取失败")//这里是失败的回调函数
      }
    })
  },


  //第一步，选择老师
  sl_tea(){
    wx.cloud.callFunction({
      name: 'getSelection',    //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
      success:res=>{
          this.setData({
            array:res.result.teacher,
            dateTime:res.result.dateTime
          })
          
          //这里是成功的回调函数
      },
      fail:err=>{
          //这里是失败的回调函数
      }
    })
  },
  //第二步，选择date
  sl_dat(d){
    this.setData({
      date: d
    })
  },
  //第三步，选择time
  sl_tim(d){
    this.setData({
      time: d
    })
  },
  // //第二步，选择date
  // sl_dat(){
  //   wx.cloud.callFunction({
  //     name: 'getSelection',    //这里写云函数名称
  //     data: {
  //         teacher:this.data.teacher,//这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         this.setData({
  //           date:res.result
  //         })//这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  //   })
  // },
  // //第三步，选择time
  // sl_tim(){
  //   wx.cloud.callFunction({
  //     name: 'getSelection',    //这里写云函数名称
  //     data: {
  //         teacher:this.data.teacher,
  //         date:this.data.day//这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         this.setData({
  //           time:res.result
  //         })//这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  //   })
  // },
  //第四步，加上tips，上传云端
  add_app(){
    wx.cloud.callFunction({
      name: 'addEvent',   //这里写云函数名称
      data: {
          teacher:this.data.teacher,
          date:this.data.day,
          time:this.data.hour,
          tips:this.data.tips
          //这里填写发送的数据
      },
      
      success:res=>{
          this.setData({
            success:res.result.success,
            message:res.result.message,
          })//这里是成功的回调函数

          this.setData({
            visible:true,
          })
          console.log('标记')
      },
      fail:err=>{
          this.setData(this.data.zh_cn?{
            message:"上传失败"
          }:{
            message:"Upload Fail"
          })
          console.log('上传失败')//这里是失败的回调函数
          console.log(err)
          this.setData({
            visible:true,
          })
      }
    })
  },
  onTap(){
    this.setData({
      visible: false,
    })
    wx.switchTab({
        url: '../home/home'
      })
    console.log(this.data.tips)
  },
  //这是按下按钮之后的函数，按理来说上传数据也应该从这走
  goTo:function(){
    //while(!this.data.success){
      this.add_app()

    //}
    //传送走是最后一步！！！
    //this.data.success
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
    var c = this.data.teacher
    var b = this.data.dateTime[c].date
    this.sl_dat(b)
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
    var c = this.data.teacher
    var d = this.data.day
    var b = this.data.dateTime[c].time[d]
    this.sl_tim(b)
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
    this.get_lang()
    //先调用云函数把老师都存进一个数组
    this.sl_tea()
    this.get_user()
    
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