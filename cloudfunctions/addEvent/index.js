// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境


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
      message: 0
    }
  }
  var teacherResult = (await teachers.where({Name:teacher}).get()).data[0]
  var OpenIDofTeacher = teacherResult.OpenID

  //判读时间段是否空闲
  if(!teacherResult.TimeTable[date]){
    return {
      success: 0,
      message: 0
    }
  }
  if(!teacherResult.TimeTable[date][time]||teacherResult.TimeTable[date][time]==0||teacherResult.TimeTable[date][time]==3){
    return {
      success: 0,
      message: 0
    }
  }



  //获取学生信息
  var StudentID = (await userInfo.where({OpenID:OpenIDofStudent}).get()).data[0]
  var StudentPhone = StudentID.PhoneNum
  var StudentName = StudentID.Name
  StudentID = StudentID.StudentID

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
      message:2
    }
  }

  //添加event
  await events.add({
    data:{
      Note:note?note:"",
      OpenIDOfStudent:OpenIDofStudent,
      OpenIDOfTeacher:OpenIDofTeacher,
      TeacherID:teacherResult._id,
      Student:StudentName,
      StudentID:StudentID,
      StudentPhone:StudentPhone,
      dateTime:dateTime,
      note:note,
      zh_cn_Place:teacherResult.zh_cn_Place,
      en_Place:teacherResult.en_Place,
      state:2,
      teacher:teacherResult.Name,
      time:time
    }
  }).then(res=>{
    return teachers.where({Name:teacher}).update({
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
    message:1
  }
}