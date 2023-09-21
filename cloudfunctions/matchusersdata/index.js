// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const userCollection = db.collection('userInfo')
  const language = event.language
  const phonenumber = event.phonenumber
  const StudentID = event.StudentID
  const OpenID = wxContext.OPENID
  const RegisterFlag = event.flag
  const result = await userCollection.where({StudentID}).get()
  const phone = String(result.data[0].PhoneNum)
  const oid2 = result.data[0].OpenID
    if (phone == phonenumber && RegisterFlag == "1" && oid2 == "") {
      await userCollection.where({StudentID:StudentID}).update({data:{OpenID:OpenID,language:language}}).then(res=>{
        console.log(res)
      })
      return {
        code: "2",
        message: '用户信息注册成功'
      }
    } else if(phone == phonenumber && RegisterFlag == "0" && result.data[0].OpenID == OpenID){
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