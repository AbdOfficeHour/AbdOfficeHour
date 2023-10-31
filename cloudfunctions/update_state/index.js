// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  //获取数据
  const db = cloud.database()
  const _ = db.command
  const id = event._id
  const state = event.state
  const workSummary = event.workSummary

  //获取指定事件
  var res = await db.collection('events').doc(id).get()
  console.log(res)
  var openIdOfTeacher = res.data.OpenIDOfTeacher
  var TeacherID = res.data.TeacherID
  //格式化日期
  var date = `${res.data.dateTime.getMonth()+1>9?'':0}${res.data.dateTime.getMonth()+1}/${res.data.dateTime.getDate()>9?'':0}${res.data.dateTime.getDate()}`
  var time = res.data.time

  //获取预约教师时间信息
  var t = await db.collection('teachers').doc(TeacherID).get()

  //只能把状态改成3，4，5
  if(state!=3&&state!=4&&state!=5)
    return {
      success:0,
      message:"状态异常"
    }

  console.log(t)
  console.log(date)
  //教师信息为3，无需更改
  if(t.data.TimeTable[date][time]==3&&state!=5)
    return {
      success:2,
      message:"已有预约"
    }

  //更改状态
  await db.collection('events').doc(id).update({
    data:{
      state:state
    }
  })

  if(state==5){
    await db.collection('events').doc(id).update({
      data:{
        workSummary:workSummary
      }
    })
  }

  //寻找所有相同时间段的预约
  var today = new Date()
  var tmp = await db.collection('events').where({
      OpenIDOfStudent:_.neq(res.data.OpenIDOfStudent),
      TeacherID:TeacherID,
      dateTime:new Date(`${today.getFullYear()}-${date.replace('/','-')}T${time.split('-')[1]}`),
      time:time
  }).get()

  //状态为3，已确认，更改所有其他预约的状态为4
  if(state==3){
    var updateTimeTable = await db.collection('teachers').doc(TeacherID).update({
      data:{
        "TimeTable":{
          [date]:{
            [time]:3
          }
        }
      }
    })
    await db.collection('events').where({
      OpenIDOfStudent:_.neq(res.data.OpenIDOfStudent),
      TeacherID:TeacherID,
      dateTime:new Date(`${today.getFullYear()}-${date.replace('/','-')}T${time.split('-')[1]}`),
      time:time
    }).update({
      data:{
        state:4
      }
    })
  }else if(state==4){
    //状态为4，如果只有一个学生预约，更改时间为空闲，否则时间保持待确认
    console.log(tmp)
    for(var i=0;i<tmp.data.length;i++)
    {
      if(tmp.data[i].state==2){
        return {
          success:1,
          message:"修改成功"
        }
      }
    }
    await db.collection('teachers').doc(TeacherID).update({
      data:{
        "TimeTable":{
          [date]:{
            [time]:1
          }
        }
      }
    })
  }


  return {
    success:1,
    message:"修改成功"
  }
}