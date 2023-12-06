// pages/login/login.js
Page({
    data: {
      // 使用说明文本
      article_cn_tea: "",
      article_cn_stu: "",
      article_en_tea: "",
      article_en_stu: "",

      // // 切换学生端/教师端picker的列表，中文
      // modifyInterfaceArray: [
      //   "学生登录",
      //   "教师登录"
      // ], 

      // // 切换学生端/教师端picker的列表，英文
      // modifyInterfaceArray_en: [
      //   "Login for Student",
      //   "Login for Teacher"
      // ], 

      // 学生端/教师端界面的代号，0表学生，1表教师
      InterfaceData: 0, 

      // 展示使用说明底部弹框 
      showRules: false, 

      // 登录按钮禁用
      buttdisable:false,

      // 检查是否成功登录
      LoginCheck:false,

      // 学号
      studentID: '', 

      phonenumber: '',
      openID: '',
      flag: '0',
      confirmProtocol: false,
      show:false,
      article:'',
      flag2:"-1",
      credit:1,
      buttons: [{
        text: 'OK',
        color: '#FF2B2B'
      }],
      language: 1
    },

  // 设置语言文本
  // 将语言文本转换为可以正确显示的markdown格式，使用组件towxml
  set_article(){
    var CN_Stu = "### OFFICE HOUR是什么？\n教师安排一定的课外时间与学生见面，这些时间叫做OFFICE HOUR。学生可以与教师见面讨论课堂学习内容，包括问题答疑、学习方法指导或需要其他额外的学习帮助。\n### 可以咨询的内容有哪些？\n具体以学生的需求为主，阿伯丁大学教师集中在阿伯丁大学课程的答疑，华南师范大学教师集中在数学类课程答疑、英语学习与雅思备考、升学指导等。\n### 谁可以参与？\n阿伯丁学院所有2021级、2022级及2023级学生均可以参与。\n### OFFICE HOUR是什么时候进行？\n一般在每周四下午，具体以与老师预约的时间为准。\n### 我需要预约吗？\n是的，你需要通过“阿伯丁学院office hour预约系统”提前与老师预约。\n### 注意事项：\n1. 如英方教师无法使用微信，则应以邮件预约为准；\n2. 学生须明确需要解决的知识难点，列好问题大纲（最好有自己的想法）。根据每月时间表，学生通过系统预约，按要求填写相关信息，并在系统提交申请。预约后，请及时查看预约结果（不一定能预约成功哦~）。学生根据预约的时间与地点，按时赴约。\n"
    var EN_Stu = "### What is OFFICE HOUR?\nAcademics schedule time outside of class to meet with students. These are called office hours. Office hours are times when you can meet with teaching staff to discuss the material being presented in class or other related interests you have. Course-related discussions include asking for extra help, seeking clarification of material presented in class and following up on aspects of the class you find compelling.\n### What can I ask for help in OFFICE HOUR?\nIt depends on the needs of students. Academics of the University of Aberdeen focus on answering questions at the Aberdeen courses learning, while Academics of South China Normal University focus on answering questions in mathematics courses, English language learning and IELTS exam preparation, as well as further postgraduate studies, etc.\n### Who can participate in OFFICE HOUR?\nAll Yr1, Yr2 and Yr3 students are welcome to join in OFFICE HOUR.\n### When can I participate in OFFICE HOUR?\nGenerally in every Thursday afternoon. The specific timeslots appointed with academic shall prevail.\n### Should I make an appointment?\nYes, you’re required to make an appointment with academics via ‘Aberdeen Institute Hour Office Appointment System”.\n### Notice:\n1. If your UoA academics are not able to access to the Wechat, please use your student email to make an appointment.\n2. Student should identify specific questions or difficulties you need to address and attempt the assigned problems before you go to office hours. Students start to make an appointment via ‘Aberdeen Institute Hour Office Appointment System” to fill in the information and submit your application. Please remember to check the academics’ response and the results, you probably fail to make an appointment due to the time conflicts. Once confirmed, please arrive the office on time!\n"
    var CN_Tea = "### OFFICE HOUR是什么？\n教师安排一定的课外时间与学生见面，这些时间叫做OFFICE HOUR。学生可以与教师见面讨论课堂学习内容，包括问题答疑、学习方法指导或需要其他额外的学习帮助。\n### 可以咨询的内容有哪些？\n具体以学生的需求为主，阿伯丁大学教师集中在阿伯丁大学课程的答疑，华南师范大学教师集中在数学类课程答疑、英语学习与雅思备考、升学指导等。\n### 谁可以参与？\n阿伯丁学院所有2021级、2022级及2023级学生均可以参与。\n### OFFICE HOUR是什么时候进行？\n一般在每周四下午，具体以与老师预约的时间为准。\n### 我需要预约吗？\n是的，你需要通过“阿伯丁学院office hour预约系统”提前与老师预约。\n### 注意事项：\n1. 如英方教师无法使用微信，则应以邮件预约为准；\n2. 学生须明确需要解决的知识难点，列好问题大纲（最好有自己的想法）。根据每月时间表，学生通过系统预约，按要求填写相关信息，并在系统提交申请。预约后，请及时查看预约结果（不一定能预约成功哦~）。学生根据预约的时间与地点，按时赴约。\n"
    var EN_Tea = "### What is OFFICE HOUR?\nAcademics schedule time outside of class to meet with students. These are called office hours. Office hours are times when you can meet with teaching staff to discuss the material being presented in class or other related interests you have. Course-related discussions include asking for extra help, seeking clarification of material presented in class and following up on aspects of the class you find compelling.\n### What can I ask for help in OFFICE HOUR?\nIt depends on the needs of students. Academics of the University of Aberdeen focus on answering questions at the Aberdeen courses learning, while Academics of South China Normal University focus on answering questions in mathematics courses, English language learning and IELTS exam preparation, as well as further postgraduate studies, etc.\n### Who can participate in OFFICE HOUR?\nAll Yr1, Yr2 and Yr3 students are welcome to join in OFFICE HOUR.\n### When can I participate in OFFICE HOUR?\nGenerally in every Thursday afternoon. The specific timeslots appointed with academic shall prevail.\n### Should I make an appointment?\nYes, you’re required to make an appointment with academics via ‘Aberdeen Institute Hour Office Appointment System”.\n### Notice:\n1. If your UoA academics are not able to access to the Wechat, please use your student email to make an appointment.\n2. Student should identify specific questions or difficulties you need to address and attempt the assigned problems before you go to office hours. Students start to make an appointment via ‘Aberdeen Institute Hour Office Appointment System” to fill in the information and submit your application. Please remember to check the academics’ response and the results, you probably fail to make an appointment due to the time conflicts. Once confirmed, please arrive the office on time!\n" 
    const app = getApp()
    var result_CN_Stu = app.towxml(CN_Stu,'markdown')
    var result_EN_Stu = app.towxml(EN_Stu,'markdown')
    var result_CN_Tea = app.towxml(CN_Tea,'markdown')
    var result_EN_Tea = app.towxml(EN_Tea,'markdown')
    this.setData({
      article_cn_stu: result_CN_Stu,
      article_en_stu: result_EN_Stu,
      article_cn_tea: result_CN_Tea,
      article_en_tea: result_EN_Tea,
    })
  },

    // 点击使用说明时触发的函数
    getRules: function(){
      console.log("点击使用说明")
      this.setData({
        showRules: true
      })
    },

    // 关闭使用说明时调用的函数
    closeRules: function(){
      console.log("关闭使用说明")
      this.setData({
        showRules: false
      })
    },

    // 学生端切换为教师端界面时调用
    bindPickInterfaceStu: function(e){
      this.setData({
        InterfaceData: 1
      })
    },

    // 教师端切换为学生端界面时调用
    bindPickInterfaceTea: function(e){
      this.setData({
        InterfaceData: 0
      })
    },

    // 设置为中文
    chinese: function (){
        this.setData({
            language: 1
        })
    },

    // 设置为英文
    english: function (){
        this.setData({
            language: 0
        })
    },

    // 修改第一行文本的输入
    changeText: function (e) {
      // console.log(e)
      this.setData({
        phonenumber: e.detail.value
      })
    },

    // 修改第二行文本的输入
    changeText2: function (e) {
      // console.log(e)
      this.setData({
        studentID: e.detail.value
      })
    },

    // 调用此方法显示底部弹出层
    showPopup(type) {
      this.setData({
          show: true
       })
    },

    // 调用此方法关闭弹出层
    closePopup(type) {
      this.setData({
          show: false
      })
    },

    // 加载页面时调用
    onLoad: async function () {
      // 设置语言使用说明文本
      this.set_article()
      // 调用云函数获取openid
      wx.cloud.callFunction({
        name: 'getOpenId',
        complete: res => {
          // console.log('getOpenID', res);
          this.setData({
            openID: res.result.openid
          })
          // console.log('openId=',this.data.openID)
        }
      });
      // 调用云函数获取用户注册态信息
      wx.cloud.callFunction({
        name: 'checkuserexist',
        data: {
          openID: this.data.openID
        },
        success: res => {
          // console.log('checkuserexist', res);
          if(res.result.result == "0"){
            wx.setStorageSync('StudentID', String(res.result.StudentID))
            wx.setStorageSync('phoneNum', String(res.result.PhoneNum))
            wx.setStorageSync('Name', res.result.Name)
            wx.setStorageSync('Credit',res.result.Credit)
            wx.setStorageSync('language', res.result.language)
            // console.log(res)
            wx.switchTab({
              url: '/pages/home/home',
            })
          }
          this.setData({
            flag: res.result.result
          })
        }
      });
    },
  
    matchusersdata: async function () {
        if (this.data.phonenumber == "" || this.data.StudentID == ""){
          wx.showModal({
            title: '警告',
            content: '请输入正确的数据',
            complete: (res) => {
              if (res.cancel) {
                this.setData({
                  buttdisable:false
                })
              }
              if (res.confirm) {
                this.setData({
                  buttdisable:false
                })
              }
            }
          })
          return false // 终止函数
        }
      // console.log('先执行数据匹配')
      // 调用云函数 matchusersdata
      // console.log('openId=', this.data.openID),
      //   console.log(
      //     this.data.flag,
      //     this.data.studentID,
      //     this.data.phonenumber,
      //     this.data.openID
      //   ),
      // console.log('即将调用云函数matchusersdata.....')
        wx.showModal({
					title: '同意使用守则',
          content: '若点击确定，则代表同意使用守则',
					complete: (res) => {
						if (res.cancel) {
              this.setData({
                buttdisable:false
              })
							return false //点取消后直接回到原登陆界面
						}
						if (res.confirm) {
              wx.showLoading({
                title: '登录中',
              })
							wx.cloud.callFunction({
                name: 'matchusersdata',
                data: {
                  flag: this.data.flag,
                  StudentID: this.data.studentID,
                  phonenumber: this.data.phonenumber,
                  openID: this.data.openID,
                  language:this.data.language
                },
                success: res => {
                  //console.log('res=', res,'flag=',this.data.flag)
                  // 匹配成功后跳转到下一个页面
                  wx.hideLoading()
                  this.setData({
                    flag2:res.result.code
                  })
                  if (true) {
                    if(res.result.code == "2"||res.result.code =="0"){
                    wx.cloud.callFunction({
                      name: 'checkuserexist',
                      data: {
                        openID: this.data.openID
                      }
                      ,
                      success: res => {
                        // console.log('checkuserexist', res);
                        if(res.result.result == "0"){
                
                          wx.setStorageSync('StudentID', String(res.result.StudentID))
                          wx.setStorageSync('phoneNum', String(res.result.PhoneNum))
                          wx.setStorageSync('Name', res.result.Name)
                          wx.setStorageSync('Credit',res.result.Credit)
                          wx.setStorageSync('language', res.result.language)
                          this.showPopup()
                        }
                        this.setData({
                          flag: res.result.result
                        })
                      }
                    })
                  }else{
                      console.log(res.result.code)
                    wx.showModal({
                      title: '验证失败',
                      content: '请输入正确的手机号和学号！',
                      }
                    )
                    this.setData({
                      buttdisable:false
                    })
                  }}
                  else{
                  }
                },
                fail: err => {
                  console.log(err)
                  wx.hideLoading()
                  wx.showModal({
                    title: '警告',
                    content: '请正确填写你的手机号和学号',
                    complete: (res) => {
                      if (res.cancel) {
                        
                      }
                  
                      if (res.confirm) {
                        
                      }
                      this.setData({
                        buttdisable:false
                      })
                    }
                  })
                }
              })
						}
					}
				})
    },
    warning: async function () {
        this.setData({
          buttdisable:true
        })
        if (this.data.phonenumber == "" || this.data.StudentID == ""){
          wx.showModal({
            title: 'warning',
            content: 'please enter your data first',
            cancelText: 'cancel',
            confirmText: 'confirm',
            complete: (res) => {
              if (res.cancel) {
                this.setData({
                  buttdisable:false
                })
              }
              if (res.confirm) {
                this.setData({
                  buttdisable:false
                })
              }
            }
          })
          return false
        }
      // console.log('先执行数据匹配')
      // 调用云函数 matchusersdata
      // console.log('openId=', this.data.openID),
      //   console.log(
      //     this.data.flag,
      //     this.data.studentID,
      //     this.data.phonenumber,
      //     this.data.openID
      //   ),
        // console.log('即将调用云函数matchusersdata.....')
      wx.showModal({
        title: 'Agree to Rules of use',
        content: 'If you click OK, you agree to the Terms of use',
        cancelText: 'NO',
        confirmText: 'OK',
        complete: (res) => {
          if (res.cancel) {
            this.setData({
              buttdisable: false
            })
          }
          if (res.confirm) {
            wx.showLoading({
              title: 'Loading',
            })
            wx.cloud.callFunction({
              name: 'matchusersdata',
              data: {
                flag: this.data.flag,
                StudentID: this.data.studentID,
                phonenumber: this.data.phonenumber,
                openID: this.data.openID,
                language:this.data.language
              },
              success: res => {
                //console.log('res=', res,'flag=',this.data.flag)
                // 匹配成功后跳转到下一个页面
                wx.hideLoading()
                this.setData({
                  flag2:res.result.code
                })
                if (true) {
                  if(res.result.code == "2"||res.result.code =="0"){
                  wx.cloud.callFunction({
                    name: 'checkuserexist',
                    data: {
                      openID: this.data.openID
                    }
        
                    ,
                    success: res => {
                      // console.log('checkuserexist', res);
                      if(res.result.result == "0"){
              
                        wx.setStorageSync('StudentID', String(res.result.StudentID))
                        wx.setStorageSync('phoneNum', String(res.result.PhoneNum))
                        wx.setStorageSync('Name', res.result.Name)
                        wx.setStorageSync('Credit',res.result.Credit)
                        wx.setStorageSync('language', res.result.language)
                        this.showPopup()
                      }
                      this.setData({
                        flag: res.result.result
                      })
                    }
                  })
                }else{
                    console.log(res.result.code)
                  wx.showModal({
                    title: 'failed',
                    content: 'wrong information！',
                    }
                  )
                  this.setData({
                    buttdisable:false
                  })
                }}
                else{
                }
              },
              fail: err => {
                wx.hideLoading()
                console.log(err)
                wx.showModal({
                  title: 'warning',
                  content: 'wrong information',
                  complete: (res) => {
                    if (res.cancel) {
                      
                    }
                
                    if (res.confirm) {
                      
                    }
                    this.setData({
                      buttdisable:false
                    })
                  }
                })
              }
            })
          }
        }
      })

    },
  
    /*show: function() {
      if(this.data.show==true){
        this.setData({
          show: false,
          visible: 'invisible'
        })
      } else {
        this.setData({
          show: true,
          visible: 'visible'
        })
      }
      
    },*/
    FinalLogin:async function(e){
      this.setData({
        FinalLogin:true
      })
      if(this.data.flag2 != "-1"){
        wx.switchTab({
          url: '/pages/home/home',
        })
      }
    },
  
    // checkboxChange: async function (e) {
    //   if (this.data.confirmProtocol == false) this.data.confirmProtocol = true
    //   else this.data.confirmProtocol = false
    //   // console.log(this.data.confirmProtocol);
    // }

    onShareAppMessage: function () {
      return {
        title: 'ABDN Office Hour',
        path: '/pages/login/login',
        promise 
      }
    }
  
  })