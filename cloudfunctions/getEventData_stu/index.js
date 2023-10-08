// 云函数入口文件
const { start } = require('repl')
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const teachers = db.collection('teachers')
  const events = db.collection('events')
  const students = db.collection('userInfo')

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
  if(!startDateTime&&!endDateTime)
    var res = await events.where({OpenIDOfTeacher:wxContext.OPENID}).orderBy('state','asc').orderBy('dateTime','asc').get()
  else
    var res = await events.where({
      OpenIDOfTeacher:wxContext.OPENID,
      dateTime:condition
    }).orderBy('state','asc').orderBy('dateTime','asc').get()
  var tmp = []
  for(var i=0;i<res.data.length;i++){
    var item = res.data[i]
    item['year'] = item.dateTime.getFullYear()
    item['date'] = `${item.dateTime.getMonth()+1}/${item.dateTime.getDate()}`
    tmp.push({
      student:item.Student,
      phone_stu:item.StudentPhone,
      date_stu:item.date,
      time_stu:item.time,
      year_stu:item.year,
      note_stu:item.Note,
      state_stu:item.state,
      _id:item._id
    })
  }
  return tmp


}