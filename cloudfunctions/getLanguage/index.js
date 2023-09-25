// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database("userInfo")
  const _ = db.command

  //返回查询用户的credit
  var result =  await db.collection('userInfo')
  .where({
    OpenID:wxContext.OPENID
  })
  .get()

  if(result.data[0])
    return {
      message:1,
      language:result.data[0].language
    }
  else
    return {
      message:0
    }
}