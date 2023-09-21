// pages/login/login.js
Page({
    data: {
      buttdisable:false,
      LoginCheck:false,
      studentID: '', // 学号
      phonenumber: '',
      openID: '',
      flag: '0',
      confirmProtocol: false,
      show:false,
      article:'',
      flag2:"-1",
      buttons: [{
        text: '确定',
        color: '#FF2B2B'
      }]
  },
    changeText: function (e) {
      // console.log(e)
      this.setData({
        phonenumber: e.detail.value
      })
    },
    changeText2: function (e) {
      // console.log(e)
      this.setData({
        studentID: e.detail.value
      })
    },
    //调用此方法显示底部弹出层
  showPopup(type) {
      this.setData({
          show: true
       })
  },
  closePopup(type) {
      this.setData({
          show: false
    })
  },
    onLoad: async function () {
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
            // console.log(res)
            wx.switchTab({
              url: '/pages/home/index',
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
          content: '请填写学号或手机号',
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
        
      wx.cloud.callFunction({
        name: 'matchusersdata',
        data: {
          flag: this.data.flag,
          StudentID: this.data.studentID,
          phonenumber: this.data.phonenumber,
          openID: this.data.openID
        },
        success: res => {
          //console.log('res=', res,'flag=',this.data.flag)
          // 匹配成功后跳转到下一个页面
          this.setData({
            flag2:res.result.code
          })
          if (true) {
            if(res.result.code == "2"){
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
                  this.showPopup()
                }
                this.setData({
                  flag: res.result.result
                })
              }
            })
          }else{
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
          url: '/pages/home/index',
        })
      }
    },
    bindSubmit: async function (e) {
      console.log(e.detail.value)
      // 获取表单数据
      var formData = e.detail.value
      // 将openid保存到表单数据中
      formData.openID = this.data.openID
      console.log(formData)
      // 调用matchusersdata云函数进行匹配
      this.matchusersdata()
    },
  
    checkboxChange: async function (e) {
      if (this.data.confirmProtocol == false) this.data.confirmProtocol = true
      else this.data.confirmProtocol = false
      // console.log(this.data.confirmProtocol);
    }
  
  })