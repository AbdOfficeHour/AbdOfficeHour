// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command
  const teacher = db.collection("teachers")

  //检查是否有老师
  // if(!event.teacher&&!event.date){
  //   var tmp = []
  //   var res = (await teacher.get()).data
  //   console.log(res)
  //   res.forEach(item=>{
  //     tmp.push(item.Name)
  //   })
  //   return tmp
  // }else if(event.teacher&&!event.date){
  //   var tmp = []
  //   //计算日期
  //   var today = new Date()
  //   var endday = new Date()
  //   endday.setDate(today.getDate()+14)
  //   var res = (await teacher.get()).data[0]["TimeTable"]
  //   for(date in res){
  //     if(date=="TimePerIodsNum")continue
  //     var month = date.split("/")[0]
  //     var day = date.split("/")[1]
  //     var dateTime = new Date(`${today.getFullYear()}-${month}-${day}T12:00:00`)
  //     if(dateTime>=today&&dateTime<=endday)
  //     {
  //       tmp.push(date)
  //     }
  //   }
  //   return tmp
  // }else if(event.teacher&&event.date){
  //   var res = await teacher.where({Name:event.teacher}).get()
  //   if(res.data.length==0)return {
  //     message:"错误",
  //     success:0
  //   }
  //   return Object.keys(res.data[0].TimeTable[event.date])
  // }

  var teaecherList = []
  var timeTable = {}

  var today = new Date()
  var endday = new Date()
  endday.setDate(today.getDate()+14);

  (await teacher.get()).data.forEach(item=>{
    teaecherList.push(item.Name)

    var tmp = {
      date:[],
      time:{}
    }
    for(var i in item.TimeTable){
      var this_date = new Date(today.getFullYear()+"-"+i.replace('/','-')+"T24:00:00")
      if(this_date<today||this_date>endday||i=="TimePeriodsNum")continue
      tmp.date.push(i)
      var tmpArray = []
      for(var j in item.TimeTable[i]){
        if(item.TimeTable[i][j]!=1&&item.TimeTable[i][j]!=2)continue
        tmpArray.push(j)
      }
      tmp.time[i] = tmpArray
    }

    timeTable[item.Name] = tmp
  })
  return {
    teacher:teaecherList,
    time:timeTable
  }
}