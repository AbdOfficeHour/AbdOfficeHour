// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {nickname:'',
  avatar:'',
  show: false,
  article: '',
  openID:'',
  isAdmin:false,
  isSuperAdmin:false,
  dialog_show:false,
  content:'LOLAAASSS',
  buttdisable:false,
  language: 1,
  credit: 1
  },
  chinese: function (){
    this.setData({
        language: 1
    })
}, 
english: function (){
    this.setData({
        language: 0
    })
    // wx.cloud.callFunction({
    //     name: "",
    //     data:{
    //         language: 0
    //     },
    //     success:res=>{
    //         console.log("成功提交")
    //     },
    //     fail:err=>{
    //         console.log("未提交，提交报错")
    //     }
    // })
},
  agreement(){
    this.showPopup()
  },
  guanyu(){
    this.setData({
      dialog_show:true
    })
  },
  confirm(){
    this.setData({
      dialog_show:false
    })
  },
  cancel(){
    this.confirm()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
	
    try{
    var temp_language = wx.getStorageSync('language')
    this.setData({
        language: temp_language
    })
    }catch(e){
        console.log("语言初始化失败")
    }
    try{
        var temp_credit = wx.getStorageSync('Credit')
        this.setData({
            credit: temp_credit
        })
        }catch(e){
            console.log("权限初始化失败")
        }
		wx.getStorage({
					key: 'Name',
				}).then(res=>{
					this.setData({
						nickname:res.data,
						avatar:res.data.length<=3?res.data.slice(1):res.data.slice(2)
					})
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