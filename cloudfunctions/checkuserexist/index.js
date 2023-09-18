// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const OpenID = wxContext.OPENID
  const db = cloud.database()
  const colle = db.collection("userInfo")

  const result = await colle.where({OpenID}).get()
  if (result.data.length > 0){
    return{
      StudentID:result.data[0].StudentID,
      PhoneNum:result.data[0].PhoneNum,
      Name:result.data[0].Name,
      result:"0",
      message:"该用户已注册"
    }
  }else{
    return{
      result:"1",
      message:"用户未注册"
    }
  }
}