// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const date = event.date
  const time = event.time
  const type = event.type

  var result = await db.collection('teachers').where({
    OpenID:wxContext.OPENID
  }).get()
  console.log(result.data[0].TimeTable[date][time])
  if(result.data[0].TimeTable[date][time]!=1&&result.data[0].TimeTable[date][time]!=0)
    return {
      success:0,
      message:"当前不可禁用"
    }

  console.log(await db.collection('teachers').where({
    OpenID:wxContext.OPENID
  }).update({
    data:{
      TimeTable:{
        [date]:{
          [time]:type
        }
      }
    }
  }))

  return {
    success:1,
    message:"修改成功"
  }
}