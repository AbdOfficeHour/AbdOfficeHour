// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  //获取数据库信息
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const userCollection = db.collection('userInfo')
  //获取注册信息，有学生和教师两种
  const {language,phonenumber,StudentID,ABDID,flag,Name} = event
  const OpenID = wxContext.OPENID
  const RegisterFlag = flag
  var result
  // phonenumber:   账号，即姓名 教师姓名
  // StudentID:     密码，即学号 教师联系方式

  
  result = await userCollection.where({StudentID:StudentID}).get()
  if(!result.data.length){
    result = await userCollection.where({StudentID:phonenumber}).get()
  }

  const name = String(result.data[0].Name)   //姓名
  const oid2 = result.data[0].OpenID          
    if (RegisterFlag == "1" && oid2 == "") {
      //学生登录
      if (result.data[0].Credit == 1){
        if(result.data[0].Name == phonenumber){
          await userCollection.where({StudentID:StudentID}).update({data:{OpenID:OpenID}})
        }

        return {
          code: "2",
          message: '用户信息注册成功'
        }
      }
      
      //教师登录
      if (result.data[0].Credit = 2){
        if(result.data[0].PhoneNum == StudentID){
          await userCollection.where({PhoneNum:StudentID}).update({data:{OpenID:OpenID}})
          await db.collection('teachers').where({Name:phonenumber}).update({data:{OpenID:OpenID}})
        }

        return {
          code: "2",
          message: '用户信息注册成功'
        }
      }

      return {
        code:"-1",
        message:"用户信息匹配失败"
      }
      
    } else if(RegisterFlag == "0" && result.data[0].OpenID == OpenID){
      return {
        code: "0",
        message: '用户信息匹配成功'
      }
    }else{
      return {
        code:"-1",
        message:"用户信息匹配失败"
      }
    }

  return {
    event:event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    code: -1,
    message: '出现错误，请稍后重试'
  }
}