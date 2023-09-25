// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  var res = await db.collection('events').where({OpenIDOfStudent:wxContext.OPENID}).orderBy('state','desc').orderBy('dateTime','asc').get()
  var tmp = []
  res.data.forEach(item=>{
    item['year'] = item.dateTime.getFullYear()
    item['date'] = `${item.dateTime.getMonth()+1}/${item.dateTime.getDate()}`
    tmp.push({
      teacher:item.teacher,
      date:item.date,
      time:item.time,
      year:item.year,
      note:item.Note,
      state:item.state,
      _id:item._id
    })
  })
  return tmp
}