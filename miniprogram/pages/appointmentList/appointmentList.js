// pages/appointmentList/appointmentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //教师端的变量
    items_for_teacher:true,//无预约时为true
    list_for_teacher:[],
    list1_for_teacher:[],
    //学生端的变量
    items: true, //无预约时为TRUE，默认true
    list:[],//存放预约记录
    list1:[],
    std_name:"",
    std_tele:"",
    //公用变量
    zh_cn: 1,
    credit: 1,
    //弹窗的数据
    visible: false,
    buttons_zh_cn: [{
	  	text: '确认',
		  color: '#FF2B2B'
    }],
	  buttons_en: [{
	  	text: 'Confirm',
		  color: '#FF2B2B'
    }],
  },
  
  get_credit()
  {
  //     wx.cloud.callFunction({
  //     name: 'getCredit',    //这里写云函数名称
  //     data: {
  //         //这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         this.setData({
  //           credit:res.result.Credit
  //         })//这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  // })
  },

  get_lang(){
    wx.cloud.callFunction({
      name: 'getLanguage',    //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
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
  //拿取预约状态并返回
  get_state(){
    console.log("in state")
    var len = this.data.list1.length
    console.log(this.data.list1)
    var list = new Array()
    for(var i = 0; i < len; i++)
    {
      console.log('1')
      if (this.data.list1[i].state == 2)
      {
        console.log('abc')
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1[i], state_word:"申请中"}
        }
        else{
          list[i] = {...this.data.list1[i], state_word:"Applying"}
        }
      }
      else if(this.data.list1[i].state == 3)
      {
        console.log('bca')
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1[i], state_word:"申请成功"}
        }
        else{
          list[i] = {...this.data.list1[i], state_word:"Application Approved"}
        }
      }
      else if(this.data.list1[i].state == 4)
      {
        console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1[i], state_word:"申请失败"}
        }
        else{
          list[i] = {...this.data.list1[i], state_word:"Application Failed"}
        }
      }
    }
    this.setData({
      list:list
    })
    console.log("list->",list)
  },
  //拿取预约的函数
  get_info(){
    wx.cloud.callFunction({
      name: 'getEventData',   //这里写云函数名称
      data: {
          //这里填写发送的数据
      },

      success:res=>{
        this.setData({
          list1:res.result,
        })//这里是成功的回调函数
        this.get_state()
      },
      fail:err=>{
          console.log("读取失败")//这里是失败的回调函数
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
            std_name:res.result.name,
            std_tele:res.result.phoneNum
            
          })//这里是成功的回调函数
      },
      fail:err=>{
          console.log("读取失败")//这里是失败的回调函数
      }
    })
  },


  goTo:function(){
    wx.navigateTo({
      url: '../appointment/appointment',
    })
  },
  
  onclick(e){
    console.log(e)
    console.log(e.currentTarget.dataset.value)
    this.setData({
      visible: true,
      state: e.currentTarget.dataset.value,
    })
  },
  onTap(e){
    this.setData({
      visible: false,
    })
  },
  

  //教师端函数
  //拿取预约信息的函数
  //拿取预约的函数
  get_info_stu(){
    wx.cloud.callFunction({
      name: 'getEventData_stu',   //这里写云函数名称
      data: {
        //这里填写发送的数据
      },
      success:res=>{
        this.setData({
          list1_for_teacher:res.result,
        })//这里是成功的回调函数
        this.get_state_stu()
      },
      fail:err=>{
          console.log("读取失败<teacher>")//这里是失败的回调数
      }
    })
  },
  //拿取预约状态并返回
  get_state_stu(){
    console.log("in state<teacher>")
    var len = this.data.list1_for_teacher.length
    console.log(this.data.list1_for_teacher)
    var list = new Array()
    for(var i = 0; i < len; i++)
    {
      console.log('1')
      if (this.data.list1_for_teacher[i].state == 2)
      {
        console.log('abc')
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"待确认"}
        }
        else{
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"To Be Confirmed"}
        }
      }
      else if(this.data.list1_for_teacher[i].state == 3)
      {
        console.log('bca')
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"已同意"}
        }
        else{
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"Application Approved"}
        }
      }
      else if(this.data.list1_for_teacher[i].state == 4)
      {
        console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"已拒绝"}
        }
        else{
          list[i] = {...this.data.list1_for_teacher[i], state_word_stu:"Application Failed"}
        }
      }
    }
    this.setData({
      list1_for_teacher:list
    })
    console.log("list->",list)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    /**发送本地openid，云函数上传*/
    /**学生和老师都需要读取相同的信息 */
    //this.get_credit()
  await wx.cloud.callFunction({
    name: 'getCredit',    //这里写云函数名称
    data: {
      //这里填写发送的数据
    },
      
  // success:res=>{
  //     this.setData({
  //       credit:res.result.Credit
  //     })//这里是成功的回调函数
  //   },
  //   fail:err=>{
  //       //这里是失败的回调函数
  //   }
  }).then(res=>{
        this.setData({
        credit:res.result.Credit
      })//这里是成功的回调函数
  }).catch(err=>{})
    //-----------------------------
    this.get_lang()
    if (this.data.credit == 1 || this.data.credit == 3)
    {
      console.log("学生登录")
      console.log(this.data.credit)
      this.get_user()
      this.get_info()
    }
    if (this.data.credit == 2 || this.data.credit == 4)
    {
      console.log("教师登录")
      this.get_info_stu()
    }
    //student
    setTimeout(()=>
    {
      if (this.data.list.length > 0)
      { 
        this.setData({
          items:false
        })
        console.log(this.data.items)
      }
    }, 1000)
    
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
    this.get_user()
    this.get_info()
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