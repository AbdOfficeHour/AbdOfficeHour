
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // index1:null,
    // index2:null,
    // index3:null,
    // zh_cn: 1,
    //结果告知弹框
    visible: false,
	  buttons_zh_cn: [{
		text: '确认',
		color: '#FF2B2B'
  }],
    buttons_en: [{
		text: 'Confirm',
		color: '#FF2B2B'
	}],
  //picker 测试
    // array: [],
    // date: [],
    // time: [],
    // dateTime: {},
  //下面是数据类型
    name: "",
    phone: "",
    stu: "",
    date: "",
    time: "",
    state: false,
    // state1: false,//现在老师信息没填
    // state2: false,//现在日期没填
    // state3: false,//现在时间没填
    // state4: false,//现在备注缺少
    
    // appoint:{},
    // teacher_1: false,
    // teacher: "",
    // day: "",
    // hour: "",
    tips: "",
    id: "",
    success:"",
    message:"",
    // message_state:""
  },



  get_lang(){
    this.setData({
      zh_cn:wx.getStorageSync('language')
    })
  },

  // add_appoint(){
  //   wx.cloud.callFunction({
  //     name: 'addEvent',    //这里写云函数名称
  //     data: {
  //         //这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         //这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  //   })
  // },


  //拿取name和tele的函数
  get_user(){
    this.setData({
      name:wx.getStorageSync('Name'),
      // phone:wx.getStorageSync('phoneNum')
    })
  },


  //第一步，选择老师
  // sl_tea(){
  //   wx.cloud.callFunction({
  //     name: 'getSelection',    //这里写云函数名称
  //     data: {
  //         //这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         this.setData({
  //           array:res.result.teacher,
  //           dateTime:res.result.dateTime
  //         })
  //         this.auto_write()
          
  //         //这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  //   })
  // },
  // //第二步，选择date
  // sl_dat(d){
  //   this.setData({
  //     date: d
  //   })
  // },
  // //第三步，选择time
  // sl_tim(d){
  //   this.setData({
  //     time: d
  //   })
  // },
  // //第四步，加上tips，上传云端
  // add_app(){
  //   wx.cloud.callFunction({
  //     name: 'addEvent',   //这里写云函数名称
  //     data: {
  //         teacher:this.data.teacher,
  //         date:this.data.day,
  //         time:this.data.hour,
  //         tips:this.data.tips
  //         //这里填写发送的数据
  //     },
      // success:res=>{
      //     wx.hideLoading()
      //     this.setData({
      //       success:res.result.success,
      //       message_state:res.result.message,
      //     })//这里是成功的回调函数

      //     this.setData({
      //       visible:true,
      //     })
      //     const c = {
      //       [1]: {
      //         [0]: "Application submitted successfully",
      //         [1]: "预约申请添加成功"
      //       },
      //       [2]: {
      //         [0]: "Do not submit multiple applications",
      //         [1]: "请勿重复提交申请"
      //       },
      //       [3]: {
      //         [0]: "Application submitted fail",
      //         [1]: "预约申请添加失败"
      //       }
      //     }
      //     var a = this.data.message_state
      //     var b = this.data.zh_cn
      //     this.setData({
      //       message:c[a][b]
      //     })
      //     console.log('标记')
      // },
  //     fail:err=>{
  //         wx.hideLoading()
  //         this.setData(this.data.zh_cn?{
  //           message:"上传失败"
  //         }:{
  //           message:"Upload Fail"
  //         })
  //         console.log('上传失败')//这里是失败的回调函数
  //         console.log(err)
  //         this.setData({
  //           visible:true,
  //         })
  //     }
  //   })
  // },
  add_tips(){
    wx.cloud.callFunction({
      name: 'update_state',  //这里写云函数名称
      data: {
          _id:this.data.id,
          state: 4,
          workSummary:"",
          reasons_for_refusal:this.data.tips//这里填写发送的数据
      },
      
      success:res=>{
        wx.hideLoading()
        this.setData({
          success:res.result.success,
          message_state:res.result.message,
        })//这里是成功的回调函数

        this.setData({
          visible:true,
        })
        const c = {
          [1]: {
            [0]: "Application submitted successfully",
            [1]: "拒绝原因添加成功"
          },
        }
        var b = this.data.zh_cn
        this.setData({
          message:c[1][b]
        })
        console.log('标记')
    },
      fail:err=>{
        wx.hideLoading()
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

  goTo:function(){
    wx.showLoading({
      title: '',
    })
    if (this.data.state)
    {
      this.add_tips()
    }
    else if(this.data.zh_cn == 1){
      wx.hideLoading()
      wx.showModal({
      title: '提示',
      content: '信息尚未填写完整',
      showCancel: false,
      confirmColor:'#FF0000',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
    else if(this.data.zh_cn == 0){
      wx.hideLoading()
      wx.showModal({
      title: 'WARNING',
      content: 'The information is not yet complete',
      confirmText:'Confirm',
      confirmColor:'#FF0000',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    }
    
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
  // goTo:function(){
  //   wx.showLoading({
  //     title: '',
  //   })
  //   if (this.data.state1 &&this.data.state2&&this.data.state3&&this.data.state4)
  //   {
  //     this.add_app()
  //   }
  //   else if(this.data.zh_cn == 1){
  //     wx.hideLoading()
  //     wx.showModal({
  //     title: '提示',
  //     content: '信息尚未填写完整',
  //     showCancel: false,
  //     confirmColor:'#FF0000',
  //     success (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  //   }
  //   else if(this.data.zh_cn == 0){
  //     wx.hideLoading()
  //     wx.showModal({
  //     title: 'WARNING',
  //     content: 'The information is not yet complete',
  //     confirmText:'Confirm',
  //     confirmColor:'#FF0000',
  //     showCancel: false,
  //     success (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  //   }
    
  // },

  // bindPickerChange1: function (e) {
  //   console.log('picker1发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index1: e.detail.value,
  //   })
  //   console.log(this.data.array[e.detail.value])
  //   this.setData({
  //     teacher: this.data.array[e.detail.value],
  //     state1: true,
  //   })
  //   var c = this.data.teacher
  //   var b = this.data.dateTime[c].date
  //   this.sl_dat(b)
  // },



  // bindPickerChange2: function (e) {
  //   console.log('picker2发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index2: e.detail.value
  //   })
  //   this.setData({
  //     day: this.data.date[e.detail.value],
  //     state2: true,
  //   })
  //   // var c = this.data.teacher
  //   // var d = this.data.day
  //   var b = this.data.dateTime[this.data.teacher].time[this.data.day]
  //   this.sl_tim(b)
  // },

  // bindPickerChange3: function (e) {
  //   console.log('picker3发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index3: e.detail.value
  //   })
  //   this.setData({
  //     hour: this.data.time[e.detail.value],
  //     state3: true,
  //   })
  // },

  getValue(e){
    this.setData({
      tips: e.detail,
    })
    if (e.detail.length >= 5)
    {
      this.setData({
        state:true
      })
    }
  },
  
  // auto_write(){
  //   if(this.data.teacher != "undefined")
  //   {
  //     this.setData({
  //       teacher_1:true
  //     })
  //   }
  //   if(this.data.teacher_1)
  //   {
  //     for (var i = 0; i < this.data.array.length; i++)
  //     {
  //       if (this.data.teacher == this.data.array[i])
  //       {
  //         this.setData({
  //           index1:[i],
  //           state1:true
  //         })
  //       }
  //     }
  //     var c = this.data.teacher
  //     var b = this.data.dateTime[c].date
  //     this.sl_dat(b)
  //     for (var i = 0; i < this.data.date.length; i++)
  //     {
  //       if (this.data.day == this.data.date[i])
  //       {
  //         this.setData({
  //           index2:[i],
  //           state2:true
  //         })
  //       }
  //     }
  //     var m = this.data.dateTime[this.data.teacher].time[this.data.day]
  //     this.sl_tim(m)
  //     for (var i = 0; i < this.data.time.length; i++)
  //     {
  //       console.log("a")
  //       if (this.data.hour == this.data.time[i])
  //       {
  //         this.setData({
  //           index3:[i],
  //           state3:true
  //         })
  //       }
  //     }
  //   }
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.name)
    this.setData({
      stu: options.stu,
      date: options.date,
      time: options.time,
      phone: options.phone,
      id: options.id,
      // day:decodeURIComponent(options.Day),
      // hour:decodeURIComponent(options.Time),
      // teacher:decodeURIComponent(options.Teacher)
    })
    
    this.get_lang()
    //先调用云函数把老师都存进一个数组
    // this.sl_tea()
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
  onShow: function () {// 为了避免个人信息界面设置语言后没有更新，调用云的语言信息
    this.get_lang()
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
    this.onLoad()
    setTimeout(function () {
      
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
    
  // }
})