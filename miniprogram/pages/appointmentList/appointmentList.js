// pages/appointmentList/appointmentList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //教务端的变量
    vs1:false,
    items_all:true,//无预约时为true
    list_all:[],
    list_all_1:[],
    pages: 1,//当前的页面
    search_value:'',
    array:[],
    teacher:'',
    vs:false,
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
    buttons_all: [{
      //按钮文本
	    text: '关闭',
	    //按钮字体颜色，可选
      color: 'red',
      id: '1'
    }, {
	    //按钮文本
	    text: '删除',
	    //按钮字体颜色
      color: 'red',
      id: '0'
    }],
    buttons_zh_cn: [{
	  	text: '确认',
		  color: '#FF2B2B'
    }],
	  buttons_en: [{
	  	text: 'Confirm',
		  color: '#FF2B2B'
    }],
    //教师端弹窗
    show: false,
    //buttons 数据格式及属性说明
    buttons_zh_cn_tea: [{
	    //按钮文本
	    text: '拒绝',
	    //按钮字体颜色，可选
      color: 'red',
      id: '1'
    }, {
	    //按钮文本
	    text: '同意',
	    //按钮字体颜色
      color: 'green',
      id: '0'
    }],
    buttons_en_tea: [{
	    //按钮文本
	    text: 'Refuse',
	    //按钮字体颜色，可选
      color: 'red',
      id: '1'
    }, {
	    //按钮文本
	    text: 'Agree',
	    //按钮字体颜色
      color: 'green',
      id: '0'
    }],
    buttons_zh_cn_xx: [{
	    //按钮文本
	    text: '关闭',
	    //按钮字体颜色，可选
      color: 'red',
      id: '1'
    }, {
	    //按钮文本
	    text: '已完成',
	    //按钮字体颜色
      color: 'green',
      id: '0'
    }],
    buttons_en_xx: [{
	    //按钮文本
	    text: 'Close',
	    //按钮字体颜色，可选
      color: 'red',
      id: '1'
    }, {
	    //按钮文本
	    text: 'Completed',
	    //按钮字体颜色
      color: 'green',
      id: '0'
    }],
  },

  
  // get_credit()
  // {
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
  // },

  // get_lang(){
  //   wx.cloud.callFunction({
  //     name: 'getLanguage',    //这里写云函数名称
  //     data: {
  //         //这里填写发送的数据
  //     },
      
  //     success:res=>{
  //         this.setData({
  //           zh_cn:res.result.language
  //         })//这里是成功的回调函数
  //     },
  //     fail:err=>{
  //         //这里是失败的回调函数
  //     }
  //   })
  // },
  //拿取预约状态并返回
  get_state(){
    console.log("in state")
    var len = this.data.list1.length
    console.log(this.data.list1)
    var list = new Array()
    for(var i = 0; i < len; i++)
    {
      //console.log('1')
      if (this.data.list1[i].state == 2)
      {
        //console.log('abc')
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
        //console.log('bca')
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
        //console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1[i], state_word:"申请失败"}
        }
        else{
          list[i] = {...this.data.list1[i], state_word:"Application Failed"}
        }
      }
      else if(this.data.list1[i].state == 5)
      {
        //console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list[i] = {...this.data.list1[i], state_word:"已完成辅导"}
        }
        else{
          list[i] = {...this.data.list1[i], state_word:"Completed tutoring"}
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
        if (this.data.list1.length > 0)
      { 
        this.setData({
          items:false
        })
        console.log(this.data.items)
      }
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
  onclick1(e){
    console.log(e)
    console.log(e.currentTarget.dataset.value)
    this.setData({
      show: true,
      state1: e.currentTarget.dataset.value,
    })
  },
  onclick2(e){
    console.log(e)
    console.log(e.currentTarget.dataset.value)
    this.setData({
      vs:true,
      vs1:true,
      state2:e.currentTarget.dataset.value
    })
  },
  onTap(e){
    this.setData({
      visible: false,
    })
  },
  onTap1(e){
    this.setData({
      show: false,
    })
  },
  onTap2(e){
    this.setData({
      vs: false,
    })
  },
  delete(){
    wx.cloud.callFunction({
      name: 'delEvent',   //这里写云函数名称
      data: {
          _id:this.data.list_all[this.data.state2]._id//这里填写发送的数据
      },
      
      success:res=>{
          console.log('删除成功')
          this.onShow()//这里是成功的回调函数  
          },
      fail:err=>{
          //这里是失败的回调函数
      },
    })
  
  },
  onTap3(e){
    console.log(e)
  
    var n = this.data.list_all
    // if (n[v].state_stu == 2)
    // {
      if (e.detail.index == 1)
      {
        this.delete()
        this.setData({
          vs1: false,
        })
        wx.switchTab({
          url: '../home/home'
        })
      }
      else if (e.detail.index == 0)
      {
        this.setData({
          vs1: false,
        })
      }
      
  },

  update_state(){
    console.log("调用上传云函数")
    var a = this.data.state1
    var b = this.data.list_for_teacher[a]._id
    console.log(a)
    console.log(b)
    wx.cloud.callFunction({
      name: 'update_state',    //这里写云函数名称
      data: {
        _id:b,
        state: this.data.list_for_teacher[a].state_stu//这里填写发送的数据
      },
      
      success:res=>{
        console.log(res)
        console.log("state上传成功")
        //这里是成功的回调函数    
      },
      fail:err=>{
        console.log("state上传失败")//这里是失败的回调函数
      } 
    })
  },
  onClose(e){

  },
  onClick(e){
    console.log(e)
    var v = this.data.state1
    var n = this.data.list_for_teacher
    // if (n[v].state_stu == 2)
    // {
      if (e.detail.index == 1)
      {
        n[v].state_stu = 3
        console.log(n)
        this.setData({
          list_for_teacher : n
        })
        this.update_state()
        this.setData({
          show: false,
        })
      }
      else if (e.detail.index == 0)
      {
        n[v].state_stu = 4
        this.setData({
          list_for_teacher : n
        })
        this.update_state()
        this.setData({
          show: false,
        })
      }
      wx.switchTab({
        url: '../home/home'
      })
  },

  onClick1(e){
    console.log(e)
    var v = this.data.state1
    var n = this.data.list_for_teacher
    // if (n[v].state_stu == 2)
    // {
      if (e.detail.index == 1)
      {
        n[v].state_stu = 5
        console.log(n)
        this.setData({
          list_for_teacher : n
        })
        this.update_state()
        this.setData({
          show: false,
        })
        wx.switchTab({
          url: '../home/home'
        })
      }
      else if (e.detail.index == 0)
      {
        this.setData({
          show: false,
        })
      }
  },
  onRefresh(e) {
    // 自己定义刷新事件
    var self = this;
    // 自己定义刷新事件
    self.setData({
      triggered: true, // 将triggered属性设置为true，表示下拉刷新已经被触发
    })
    this.onShow()
    wx.showToast({
      title: ""
    })
    setTimeout(function () {
      self.setData({
        triggered: false, // 将triggered属性设置为false，表示下拉刷新已完成
        
      })
      
      console.log('下拉刷新已完成');
    }, 1000);
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
        if (this.data.list1_for_teacher.length > 0)
        { 
        this.setData({
          items_for_teacher:false
        })
        console.log(this.data.items_for_teacher)
      }
      },
      fail:err=>{
        console.log("读取失败<teacher>")//这里是失败的回调数
      }
    })
  },

  //onClose
  onClose(){
    this.setData({
      show:false
    })
  },
  //拿取预约状态并返回
  get_state_stu(){
    this.setData({
      credit:wx.getStorageSync('Credit'),
      zh_cn:wx.getStorageSync('language'),
    })
    console.log("in state<teacher>")
    var len = this.data.list1_for_teacher.length
    console.log(this.data.list1_for_teacher)
    var list1 = new Array()
    for(var i = 0; i < len; i++)
    {
      console.log('1')
      if (this.data.list1_for_teacher[i].state_stu == 2)
      {
        console.log('abc')
        if (this.data.zh_cn == 1)
        {
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"待确认"}
        }
        else{
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"To Be Confirmed"}
        }
      }
      else if(this.data.list1_for_teacher[i].state_stu == 3)
      {
        console.log('bca')
        if (this.data.zh_cn == 1)
        {
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"已同意"}
        }
        else{
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"Application Approved"}
        }
      }
      else if(this.data.list1_for_teacher[i].state_stu == 4)
      {
        console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"已拒绝"}
        }
        else{
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"Refused"}
        }
      }
      else if(this.data.list1_for_teacher[i].state_stu == 5)
      {
        console.log('bca')
        
        if (this.data.zh_cn == 1)
        {
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"已完成辅导"}
        }
        else{
          list1[i] = {...this.data.list1_for_teacher[i], state_word_stu:"Completed tutoring"}
        }
      }
    }
    this.setData({
      list_for_teacher : list1
    })
    console.log("list->",this.data.list_for_teacher)
  },
  //拿到当前的list
  async  get_all_list(){
    const getEvent = require('getEvent')
    var pages = this.data.pages
    let datas = await getEvent.main(pages,'','')
    var list_all = new Array()

      var a = datas
      console.log(a)
      list_all = [...this.data.list_all,...a]
      console.log(list_all)
      this.setData({
        list_all:list_all
      })
      this.get_state_word()
    console.log('abccccccc')
    console.log(list_all)
    
    if (this.data.list_all.length > 0)
    {
      this.setData({
        items_all:false
      })
    }
  },
  //拿取教务的state_word
  get_state_word(){
    console.log("in state 教务")
    var len = this.data.list_all.length
    console.log(this.data.list_all)
    var list_111 = new Array()
    for(var i = 0; i < len; i++)
    {
      //console.log('1')
      if (this.data.list_all[i].state == 2)
      {
        //console.log('abc')
        // if (this.data.zh_cn == 1)
        // {
          list_111[i] = {...this.data.list_all[i], state_word:"申请中"}
        // }
        // else{
        //   list[i] = {...this.data.list_all[i], state_word:"Applying"}
        // }
      }
      else if(this.data.list_all[i].state == 3)
      {
        //console.log('bca')
        // if (this.data.zh_cn == 1)
        // {
          list_111[i] = {...this.data.list_all[i], state_word:"申请成功"}
        // }
        // else{
        //   list[i] = {...this.data.list1[i], state_word:"Application Approved"}
        // }
      }
      else if(this.data.list_all[i].state == 4)
      {
        //console.log('bca')
        
        // if (this.data.zh_cn == 1)
        // {
          list_111[i] = {...this.data.list_all[i], state_word:"申请失败"}
        // }
        // else{
        //   list[i] = {...this.data.list1[i], state_word:"Application Failed"}
        // }
      }
      else if(this.data.list_all[i].state == 5)
      {
        //console.log('bca')
        
        // if (this.data.zh_cn == 1)
        // {
          list_111[i] = {...this.data.list_all[i], state_word:"已完成辅导"}
        // }
        // else{
        //   list[i] = {...this.data.list1[i], state_word:"Completed tutoring"}
        // }
      }
    }
    this.setData({
      list_all:list_111
    })
    console.log("list_all->",this.data.list_all)
  },
  //上拉触底
  async loadMore(e) {
    var self = this;
    // // 为最后一页
    if (0) {
      // wx.showToast({
      //   // title: '',
      // })
    } else {
      const getEvent = require('getEvent')
        console.log("加载更多");
        this.setData({})
        this.data.pages++
        let datas = await getEvent.main(this.data.pages,'',this.data.search_value)
        console.log('bbbbbbbc')
        console.log(datas)
        self.setData({
          list_all:[...this.data.list_all,...datas]
        })
        this.get_state_word()
    }
  },
  //搜索栏
  search(e) {
    //输入框值
    console.log(e.detail.value)
    //搜索逻辑自行处理
    //const getEvent = require('getEvent')
    this.setData({
      list_all:[],
      pages: 1,
      search_value:e.detail.value
    })
    this.search1()
    // let datas = await getEvent.main(this.data.pages,'',this.data.search_value)
    // this.setData({
    //   list_all:datas
    // })
    // this.get_state_word()
  },
  async search1(){
    const getEvent = require('getEvent')
    let datas = await getEvent.main(this.data.pages,this.data.teacher,this.data.search_value)
    this.setData({
      list_all:datas
    })
    console.log('->',datas)
    this.get_state_word()
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
            })
            
            //这里是成功的回调函数
        },
        fail:err=>{
            //这里是失败的回调函数
        }
      })
    },
    bindPickerChange1(e) {
      console.log('picker1发送选择改变，携带值为', e.detail.value)
      this.setData({
        index1: e.detail.value,
      })
      console.log(this.data.array[e.detail.value])
      this.setData({
        teacher: this.data.array[e.detail.value],
      })
      //const getEvent = require('getEvent')
      this.setData({
        list_all:[],
        pages: 1,
      })
      console.log('kkkkk')
      console.log(this.data.list_all)
      this.search1()
      // let datas = await getEvent.main(this.data.pages,this.data.teacher,'')
      // this.setData({
      //   list_all:datas
      // })
      // this.get_state_word()
    },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //拿取教务端的信息
    
    /**发送本地openid，云函数上传*/
    /**学生和老师都需要读取相同的信息 */
    // this.setData({
    //   credit:wx.getStorageSync('Credit'),
    // })
    // //-----------------------------
    // if (this.data.credit == 1 || this.data.credit == 3)
    // {
    //   console.log("学生登录")
    //   console.log(this.data.credit)
    //   this.setData({
    //     std_name:wx.getStorageSync('Name'),
    //     std_tele:wx.getStorageSync('phoneNum')
    //   })
    //   this.get_info()
    // }
    // if (this.data.credit == 2 || this.data.credit == 4)
    // {
    //   console.log("教师登录")
    //   this.get_info_stu()
    // }
    // //教务端
    // if (this.data.credit == 6)
    // {
    //   this.sl_tea()
    //   this.setData({
    //     list_all:[],
    //     pages:1,
    //     search_value:''
    //   })
    //   console.log('教务端')
    //   this.get_all_list()
    // }
    // //管理员端
    // if (this.data.credit == 5)
    // {
    //   this.sl_tea()
    //   this.setData({
    //     list_all:[],
    //     pages:1,
    //     search_value:''
    //   })
    //   console.log('管理员端')
    //   this.get_all_list()
    // }
    // // 为了避免个人信息界面设置语言后没有更新，调用云的语言信息
    // wx.cloud.callFunction({
    //   name: "getLanguage",
    //   success:res=>{
    //     this.setData({
    //       language: res.result.language
    //     })
    //   }
    // })
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
    // 获取语言信息，通过缓存
    // wx.getStorageSync('language')
    // this.get_state()
    // this.get_state_stu()
    // this.setData({
    //   std_name:wx.getStorageSync('Name'),
    //   std_tele:wx.getStorageSync('phoneNum')
    // })
    // this.get_info()
    // this.get_info_stu()
    //拿取教务端的信息
    
    /**发送本地openid，云函数上传*/
    /**学生和老师都需要读取相同的信息 */
    this.setData({
      credit:wx.getStorageSync('Credit'),
    })
    //-----------------------------
    if (this.data.credit == 1 || this.data.credit == 3)
    {
      console.log("学生登录")
      console.log(this.data.credit)
      this.setData({
        std_name:wx.getStorageSync('Name'),
        std_tele:wx.getStorageSync('phoneNum')
      })
      this.get_info()
    }
    if (this.data.credit == 2 || this.data.credit == 4)
    {
      console.log("教师登录")
      this.get_info_stu()
    }
    //教务端
    if (this.data.credit == 6)
    {
      this.sl_tea()
      this.setData({
        list_all:[],
        pages:1,
        search_value:''
      })
      console.log('教务端')
      this.get_all_list()
    }
    //管理员端
    if (this.data.credit == 5)
    {
      this.sl_tea()
      this.setData({
        list_all:[],
        pages:1,
        search_value:''
      })
      console.log('管理员端')
      this.get_all_list()
    }
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
  this.onShow()
    setTimeout(function () {
      
      wx.stopPullDownRefresh()
    },1000)
    
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