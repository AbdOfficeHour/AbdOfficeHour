// pages/login/login.js
Page({
    data: {
      // 使用说明文本
      article_cn_tea: "",
      article_cn_stu: "",
      article_en_tea: "",
      article_en_stu: "",

      // 切换学生端/教师端picker的列表，中文
      modifyInterfaceArray: [
        "学生登录",
        "教师登录"
      ], 

      // 切换学生端/教师端picker的列表，英文
      modifyInterfaceArray_en: [
        "Login for Student",
        "Login for Teacher"
      ], 

      // 学生端/教师端界面的代号，0表学生，1表教师（和数组索引对应）
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
        text: 'yes',
        color: '#FF2B2B'
      }],
      language: 1
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

    // 选择学生端登录/教师端界面时调用
    bindPickInterface: function(e){
      this.setData({
        InterfaceData: e.detail.value
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
        this.setData({
          buttdisable:true
        })
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
        complete: (res) => {
          if (res.cancel) {
            this.setData({
              buttdisable: false
            })
          }
          if (res.confirm) {
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
  
  })