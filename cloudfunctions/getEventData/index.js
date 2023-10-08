// 云函数入口文件
const { start } = require('repl')
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  var Credit = (await db.collection('userInfo').where({OpenID:wxContext.OPENID}).get()).data[0].Credit

  //获取时间
  const startDate = event.startDate
  const endDate = event.endDate
  const startTime = event.startTime
  const endTime = event.endTime
  //组合时间
  if((!startDate&&startTime)||(!endDate&&endTime))
    return {
      success:0,
      message:"时间信息有误"
    }
  
    var startDateTime
    var endDateTime

    if(startDate&&startTime)startDateTime = new Date(`${startDate}T${startTime}`)
    if(endDate&&endTime)endDateTime = new Date(`${endDate}T${endTime}`)

    var condition
    if(startDateTime&&endDateTime){
      condition = _.and([_.gte(startDateTime),_.lt(endDateTime)])
    }else if(startDateTime&&!endDateTime){
      condition = _.gte(startDateTime)
    }else if(!startDateTime&&endDateTime){
      condition = _.lt(endDateTime)
    }

    //组合查询条件吗
    if(Credit==1){
      var condition_stu = {
        OpenIDOfStudent:wxContext.OPENID
      }
      var condition_stu_with_date = {
        OpenIDOfStudent:wxContext.OPENID,
        dateTime:condition
      }
    }else if(Credit==2){
      var condition_stu = {
        OpenIDOfTeacher:wxContext.OPENID
      }
      var condition_stu_with_date = {
        OpenIDOfTeacher:wxContext.OPENID,
        dateTime:condition
      }
    }

  if(!startDateTime&&!endDateTime)
    var res = await db.collection('events').where(condition_stu).orderBy('state','desc').orderBy('dateTime','asc').get()
  else
    var res = await db.collection('events').where(condition_stu_with_date).orderBy('state','asc').orderBy('dateTime','asc').get()
  
  var tmp = []
  res.data.forEach(item=>{
    item['year'] = item.dateTime.getFullYear()
    item['date'] = `${item.dateTime.getMonth()+1}/${item.dateTime.getDate()}`
    tmp.push({
      teacher:item.teacher,
      student:item.Student,
      phone_stu:item.StudentPhone,
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