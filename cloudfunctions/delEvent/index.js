// 云函数入口文件
const cloud = require('wx-server-sdk')
const moment = require('moment')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const id = event._id

  const credit = (await db.collection("userInfo").where({
    OpenID:wxContext.OPENID
  }).get()).data[0].Credit

  if((await db.collection("events").doc(id).get()).data.state!=2)
    return {
      success:-1,
      message:"无法删除"
    }

  var result = {}

  var ans = await db.collection('events')
  .aggregate()
  .group({
    _id:{
      dateTime:"$dateTime",
      time:"$time",
      TeacherID:"$TeacherID",
      StudentID:"$StudentID"
    },
    ID:_.aggregate.push("$_id"),
    num:_.aggregate.sum(1)
  })
  .match({
    ID:_.elemMatch(_.eq(id))
  })
  .end()


  await db.collection('events').doc(id).remove()
  .then(async(res)=>{
    console.log(res)
    if(res.stats.removed){
      result = {
      success:1,
      message:"删除成功"
      }
      var dateTime = ans.list[0]._id.dateTime
      var time = ans.list[0]._id.time
      console.log(moment(dateTime).format('MM/DD'))
      db.collection('teachers').doc(ans.list[0]._id.TeacherID).update({
        data:{
          TimeTable:{
            [moment(dateTime).format('MM/DD')]:{
              [time]:credit==1?1:0
            }
          }
        }
        })
    }else{
      result = {
        success:0,
        message:"删除失败"
      }
    }
  })
  
  return result
}