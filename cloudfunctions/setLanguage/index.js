// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  var language = event.language

  var result = await db.collection('userInfo').where({OpenID:wxContext.OPENID}).get()
  
  if(!result.data.length)
    return {
      message:"用户不存在",
      success:0
    }
  else
  {
    await db.collection('userInfo').where({OpenID:wxContext.OPENID}).update({
      data:{
        language:language
      }
    })
    return {
      success:1,
      message:"修改成功"
    }
  }
}