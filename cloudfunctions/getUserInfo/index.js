// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const colle = db.collection('userInfo')

  var res = await colle.where({OpenID:wxContext.OPENID}).get()
  if(res.data.length){
    var name = res.data[0].Name
    var phoneNum = res.data[0].PhoneNum
    return {
      success:1,
      name:name,
      phoneNum:phoneNum
    }
  }
  else{
    return{
      success:0,
      message:"用户不存在"
    }
  }
}