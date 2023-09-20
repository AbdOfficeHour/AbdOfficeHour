// pages/appointmentList/appointmentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: true, //无预约时为TRUE，默认true
    zh_cn: 0,
    credit: 1,
    list:[],//存放预约记录
    test: true,
    //弹窗的数据
    std_name:"",
    std_tele:"",
    state: 0,
    visible: false,
	  buttons: [{
	  	text: 'Confirm',
		  color: '#FF2B2B'
    }],
  },
  
  get_credit()
  {
    wx.cloud.callFunction({
      name: 'getCredit',    //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
      success:res=>{
          this.setData({
            credit:res.result.Credit
          })//这里是成功的回调函数
      },
      fail:err=>{
          //这里是失败的回调函数
      }
  })
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

  //拿取预约的函数
  get_info(){
    wx.cloud.callFunction({
      name: 'getEventData',   //这里写云函数名称
      data: {
          //这里填写发送的数据
      },
      
      success:res=>{
          this.setData({
            list:res.result,
            
          })//这里是成功的回调函数
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
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    /**发送本地openid，云函数上传*/
    /**学生和老师都需要读取相同的信息 */
    this.get_credit()
    this.get_lang()
    this.get_user()
    this.get_info()
    setTimeout(()=>
    {
      if (this.data.list.length > 0)
      { 
        this.setData({
          items:false
        })
        console.log(this.data.items)
      }
    }, 2000)
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