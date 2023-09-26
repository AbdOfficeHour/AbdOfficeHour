// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  button: [{
    text: "确认"
  }],
  languageIndex: 0,
  languageArray:[
    "English",
    "中文"
  ],
  nickname:'',
  avatar:'',
  show: false,
  showUpload: false,
  showUploadFail: false,
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

  bindPickLanguage: function(e){
    console.log(e.detail)
    this.setData({
      language: +e.detail.value,
      languageIndex: +e.detail.value
    })
    wx.cloud.callFunction({
      name: "setLanguage",
      data: {
        language: +e.detail.value
      },
      // + 号转换为int类型数据
      success:res=> {
        console.log("云端语言设置完成")
        wx.setStorageSync("language", +e.detail.value)
        console.log("本地语言设置完成")
        if (res.result.success === 0){
          this.setData({
            showUpload: true
          })
          console.log("文件输入异常！")
        }
      },
      fail:err=> {
        console.log("文件输入异常！")
        console.log(err.errMsg)
      }
    })
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
        language: temp_language,
        languageIndex: temp_language
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

    var content= '123456678'               //使用规则文本添加处
      const app = getApp();
        var result = app.towxml(content,'markdown',{
          theme:'light',                   // 主题，默认`light`
        });

        wx.getStorage({                    //头像显示名字处
          key: 'Name',
            }).then(res=>{
              this.setData({
                nickname:res.data,
                avatar:res.data.length<=3?res.data.slice(1):res.data.slice(2)
              })  
        })  
        // 更新解析数据
        this.setData({
          article: result
        });
        wx.cloud.callFunction({
          name:'queryCreditById'
        }).then(res=>{
          this.setData({
            isAdmin:res.result.credit>=10?true:false,
            isSuperAdmin:res.result.credit>=100?true:false
          })
        })
    var aboutus = "25854"                     //”关于我们“界面内容
          var show = app.towxml(aboutus,'markdown',{
            theme:'light',                   // 主题，默认`light`
          });
        this.setData({                       // 更新解析数据
          detail: show
        })

  },

// 上传教师信息与时间表
sentInfoTable: function(e){
  console.log(e)
  wx.chooseMessageFile({
    count: 1,
    success:res => {
      console.log(res)
      const tempFilePaths = res.tempFiles[0].path
      const postfix =  tempFilePaths.match(/\.[^.]+?$/)[0]
      const cloudpath = "excel/"+new Date().getTime()+postfix
      var that = this
      if (postfix === ".xlsx"){ 
        wx.cloud.uploadFile({
          cloudPath: cloudpath,
          filePath: tempFilePaths,
          success:res => {
            console.log(res)
            that.setData({
              fileID: res.fileID,
              showUpload: true
            })
            wx.cloud.callFunction({
              name: "loadExcel",
              data: {
                fileID: this.data.fileID
              }
            })
          },
          fail:err => {
            console.log(err)
            that.setData({
              showUploadFail: true
            })
          }
        })
      }
      else {
        this.setData({
          showUploadFail: true
        })
      }
    }
  })
},

onClick: function(e){
  this.setData({
    showUpload: false,
    showUploadFail: false
  })
},

onClickFail: function(e){
  this.setData({
    showUpload: false,
    showUploadFail: false
  })
},

//调用此方法显示底部弹出层
showPopup(type){
  this.setData({
    show: true
  })
},
closePopup(type){
  this.setData({
    show: false
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