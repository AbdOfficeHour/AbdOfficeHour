// 云函数入口文件
const { start } = require('repl')
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

function DateToString(date){
  return `${date.getFullYear()}/${date.getMonth()>8?'':0}${date.getMonth()+1}/${date.getDate()>9?'':0}${date.getDate()}`
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  const teachers = db.collection('teachers')
  const events = db.collection('events')
  const students = db.collection('userInfo')

  //获取TeacherID
  var TeacherID = (await teachers.where({OpenID:wxContext.OPENID}).get()).data[0]._id

  //获取时间
  var startDate = event.startDate
  var endDate = event.endDate
  var startTime = event.startTime
  var endTime = event.endTime

  //组合时间
  if((!startDate&&startTime)||(!endDate&&endTime))
    return {
      success:0,
      message:"时间信息有误"
    }
  
    var startDateTime
    var endDateTime

    if(startDate)startDate = startDate.replaceAll('/','-');
    if(endDate)endDate = endDate.replaceAll('/','-');

    if(startDate&&startTime)startDateTime = new Date(`${startDate}T${startTime}`)
    if(endDate&&endTime)endDateTime = new Date(`${endDate}T${endTime}`)

    var condition
    if(startDateTime&&endDateTime){
      condition = _.and([_.gte(startDateTime),_.lte(endDateTime)])
    }else if(startDateTime&&!endDateTime){
      condition = _.gte(startDateTime)
    }else if(!startDateTime&&endDateTime){
      condition = _.lte(endDateTime)
    }
  if(!startDateTime&&!endDateTime)
    var res = await events.where({TeacherID:TeacherID}).orderBy('state','asc').orderBy('dateTime','asc').get()
  else
    var res = await events.where({
      TeacherID:TeacherID,
      dateTime:condition
    }).orderBy('state','asc').orderBy('dateTime','asc').get()
  var tmp = []
  var today = new Date()
  today = DateToString(today)
  for(var i=0;i<res.data.length;i++){
    var item = res.data[i]
    item['year'] = item.dateTime.getFullYear()
    item['date'] = DateToString(item.dateTime)
    
    if(item['date']>=today){
      tmp.push({
        student:item.Student,
        phone_stu:item.StudentPhone,
        date_stu:item.date,
        time_stu:item.time,
        year_stu:item.year,
        note_stu:item.Note,
        state_stu:item.state,
        reasons_for_refusal:item.reasons_for_refusal?item.reasons_for_refusal:"",
        _id:item._id
      })
    }else{
      await db.collection('events').doc(item._id).update({
        data:{
          state:7
        }
      })
    }
  }
  return tmp
}