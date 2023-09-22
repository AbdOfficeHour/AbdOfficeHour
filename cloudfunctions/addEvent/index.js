// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

/*
  {
    teacher:,
    date:,
    time:,
    note:,  
  }
*/

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  //获取数据集合
  const teachers = db.collection('teachers')
  const userInfo = db.collection('userInfo')
  const events = db.collection('events')
  //获取相关数据
  var teacher = event.teacher
  var date = event.date
  var time = event.time
  var note = event.tips
  var OpenIDofStudent = wxContext.OPENID
  //格式化日期
  date = date.replace('.','/')
  //验证老师
  if(teacher==""||date==""||time==""){
    return{
      success: 0,
      message: "请输入正确的信息"
    }
  }
  var teacherResult = (await teachers.where({Name:teacher}).get()).data[0]

  //判读时间段是否空闲
  if(!teacherResult.TimeTable[date]){
    return {
      success: 0,
      message: "日期不存在"
    }
  }
  if(!teacherResult.TimeTable[date][time]||teacherResult.TimeTable[date][time]==0||teacherResult.TimeTable[date][time]==3){
    return {
      success: 0,
      message: "时间非空闲"
    }
  }



  //获取学生信息
  var StundentID = (await userInfo.where({OpenID:OpenIDofStudent}).get()).data[0]
  var StudentPhone = StundentID.PhoneNum
  StundentID = StundentID.StudentID

  //处理时间
  var today = new Date()
  var dateTime = new Date(`${today.getFullYear()}-${date.replace('/','-')}T${time.split('-')[1]}`)

  //检查重复预约
  if((await events.where({
    OpenIDOfStudent:OpenIDofStudent,
    teacher:teacher,
    dateTime:dateTime,
    time:time
  }).count()).total){
    return {
      success:0,
      message:"请勿重复预约"
    }
  }

  //添加event
  await events.add({
    data:{
      Note:note?note:"",
      OpenIDOfStudent:OpenIDofStudent,
      OpenIDOfTeacher:"",
      StudentID:StundentID,
      StudentPhone:StudentPhone,
      dateTime:dateTime,
      place:teacherResult.Place,
      state:2,
      teacher:teacherResult.Name,
      time:time
    }
  }).then(res=>{
    teachers.where({Name:teacher}).update({
      data:{
        TimeTable:{
          [date]:{
            [time]:2
          }
        }
      }
    })
  })
  return {
    success:1,
    message:"成功"
  }
}