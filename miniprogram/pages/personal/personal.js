// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  button: [{
    text: "确认"
  }],
  // 文本
  article_cn_stu: "",
  article_en_stu: "",
  article_cn_tea: "",
  article_en_tea: "",
  about_cn: "",
  about_en: "",
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
  openID:'',
  isAdmin:false,
  isSuperAdmin:false,
  dialog_show:false,
  content:'LOLAAASSS',
  buttdisable:false,
  language: 1,
  credit: 1
  },

  Tobug: function(){
    wx.navigateTo({
      url: '../messageBoard/messageBoard',
    })
  },

  bindPickLanguage: function(e){
    console.log(e.detail)
    wx.setStorageSync("language", +e.detail.value)
    console.log("本地语言设置完成")
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

  //文本设置
  // 设置语言文本
  // 将语言文本转换为可以正确显示的markdown格式，使用组件towxml
  set_article(){
    var CN_Stu = "### OFFICE HOUR是什么？\n教师安排一定的课外时间与学生见面，这些时间叫做OFFICE HOUR。学生可以与教师见面讨论课堂学习内容，包括问题答疑、学习方法指导或需要其他额外的学习帮助。\n### 可以咨询的内容有哪些？\n具体以学生的需求为主，阿伯丁大学教师集中在阿伯丁大学课程的答疑，华南师范大学教师集中在数学类课程答疑、英语学习与雅思备考、升学指导等。\n### 谁可以参与？\n阿伯丁学院所有2021级、2022级及2023级学生均可以参与。\n### OFFICE HOUR是什么时候进行？\n一般在每周四下午，具体以与老师预约的时间为准。\n### 我需要预约吗？\n是的，你需要通过“阿伯丁学院office hour预约系统”提前与老师预约。\n### 注意事项：\n1. 如英方教师无法使用微信，则应以邮件预约为准；\n2. 学生须明确需要解决的知识难点，列好问题大纲（最好有自己的想法）。根据每月时间表，学生通过系统预约，按要求填写相关信息，并在系统提交申请。预约后，请及时查看预约结果（不一定能预约成功哦~）。学生根据预约的时间与地点，按时赴约。\n"
    var EN_Stu = "### What is OFFICE HOUR?\nAcademics schedule time outside of class to meet with students. These are called office hours. Office hours are times when you can meet with teaching staff to discuss the material being presented in class or other related interests you have. Course-related discussions include asking for extra help, seeking clarification of material presented in class and following up on aspects of the class you find compelling.\n### What can I ask for help in OFFICE HOUR?\nIt depends on the needs of students. Academics of the University of Aberdeen focus on answering questions at the Aberdeen courses learning, while Academics of South China Normal University focus on answering questions in mathematics courses, English language learning and IELTS exam preparation, as well as further postgraduate studies, etc.\n### Who can participate in OFFICE HOUR?\nAll Yr1, Yr2 and Yr3 students are welcome to join in OFFICE HOUR.\n### When can I participate in OFFICE HOUR?\nGenerally in every Thursday afternoon. The specific timeslots appointed with academic shall prevail.\n### Should I make an appointment?\nYes, you’re required to make an appointment with academics via ‘Aberdeen Institute Hour Office Appointment System”.\n### Notice:\n1. If your UoA academics are not able to access to the Wechat, please use your student email to make an appointment.\n2. Student should identify specific questions or difficulties you need to address and attempt the assigned problems before you go to office hours. Students start to make an appointment via ‘Aberdeen Institute Hour Office Appointment System” to fill in the information and submit your application. Please remember to check the academics’ response and the results, you probably fail to make an appointment due to the time conflicts. Once confirmed, please arrive the office on time!\n"
    var CN_Tea = "### OFFICE HOUR是什么？\n教师安排一定的课外时间与学生见面，这些时间叫做OFFICE HOUR。学生可以与教师见面讨论课堂学习内容，包括问题答疑、学习方法指导或需要其他额外的学习帮助。\n### 可以咨询的内容有哪些？\n具体以学生的需求为主，阿伯丁大学教师集中在阿伯丁大学课程的答疑，华南师范大学教师集中在数学类课程答疑、英语学习与雅思备考、升学指导等。\n### 谁可以参与？\n阿伯丁学院所有2021级、2022级及2023级学生均可以参与。\n### OFFICE HOUR是什么时候进行？\n一般在每周四下午，具体以与老师预约的时间为准。\n### 我需要预约吗？\n是的，你需要通过“阿伯丁学院office hour预约系统”提前与老师预约。\n### 注意事项：\n1. 如英方教师无法使用微信，则应以邮件预约为准；\n2. 学生须明确需要解决的知识难点，列好问题大纲（最好有自己的想法）。根据每月时间表，学生通过系统预约，按要求填写相关信息，并在系统提交申请。预约后，请及时查看预约结果（不一定能预约成功哦~）。学生根据预约的时间与地点，按时赴约。\n"
    var EN_Tea = "### What is OFFICE HOUR?\nAcademics schedule time outside of class to meet with students. These are called office hours. Office hours are times when you can meet with teaching staff to discuss the material being presented in class or other related interests you have. Course-related discussions include asking for extra help, seeking clarification of material presented in class and following up on aspects of the class you find compelling.\n### What can I ask for help in OFFICE HOUR?\nIt depends on the needs of students. Academics of the University of Aberdeen focus on answering questions at the Aberdeen courses learning, while Academics of South China Normal University focus on answering questions in mathematics courses, English language learning and IELTS exam preparation, as well as further postgraduate studies, etc.\n### Who can participate in OFFICE HOUR?\nAll Yr1, Yr2 and Yr3 students are welcome to join in OFFICE HOUR.\n### When can I participate in OFFICE HOUR?\nGenerally in every Thursday afternoon. The specific timeslots appointed with academic shall prevail.\n### Should I make an appointment?\nYes, you’re required to make an appointment with academics via ‘Aberdeen Institute Hour Office Appointment System”.\n### Notice:\n1. If your UoA academics are not able to access to the Wechat, please use your student email to make an appointment.\n2. Student should identify specific questions or difficulties you need to address and attempt the assigned problems before you go to office hours. Students start to make an appointment via ‘Aberdeen Institute Hour Office Appointment System” to fill in the information and submit your application. Please remember to check the academics’ response and the results, you probably fail to make an appointment due to the time conflicts. Once confirmed, please arrive the office on time!" 
    var about_CN = "开发者邮箱：\n20223803065@m.scnu.edu.cn"
    var about_EN = "Developer email: \n20223803065@m.scnu.edu.cn"
    const app = getApp()
    var result_CN_Stu = app.towxml(CN_Stu,'markdown')
    var result_EN_Stu = app.towxml(EN_Stu,'markdown')
    var result_CN_Tea = app.towxml(CN_Tea,'markdown')
    var result_EN_Tea = app.towxml(EN_Tea,'markdown')
    var about_CN = app.towxml(about_CN, 'markdown')
    var about_EN = app.towxml(about_EN, 'markdown')
    this.setData({
      article_cn_stu: result_CN_Stu,
      article_en_stu: result_EN_Stu,
      article_cn_tea: result_CN_Tea,
      article_en_tea: result_EN_Tea,
      about_cn: about_CN,
      about_en: about_EN
    })
  },

  onLoad(options) {
    this.set_article()
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
        wx.getStorage({                    //头像显示名字处
          key: 'Name',
            }).then(res=>{
              this.setData({
                nickname:res.data,
                avatar:res.data.length<=3?res.data.slice(1):res.data.slice(2)
              })  
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
            })
            wx.cloud.callFunction({
              name: "loadExcel",
              data: {
                fileID: this.data.fileID
              },
              success:res=>{
                this.setData({
                  showUpload: true
                })
              },
              fail:res=>{
                console.log(res)
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

  // /**
  //  * 用户点击右上角分享
  //  */
  onShareAppMessage: function () {
    return {
      title: 'ABDN Office Hour',
      path: '/pages/login/login',
      promise 
    }
  }
})