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

  //临时变量
  var teacherList = []
  var timeTable = {}

  //计算日期保证不超过14天
  var today = new Date()
  var endday = new Date()
  endday.setDate(today.getDate()+14);

  //枚举所有教师
  (await teacher.get()).data.forEach(item=>{
    //添加教师姓名
    teacherList.push(item.Name)

    //临时对象
    var tmp = {
      date:[],
      time:{}
    }
    //排日期
    var sortTimeTable = Object.keys(item.TimeTable).sort()
    //枚举所有日期
    for(var si = 0;si<sortTimeTable.length;si++){
      i = sortTimeTable[si]
      var this_date = new Date(i.replaceAll('/','-')+"T24:00:00")
      if(this_date<today||this_date>endday||!this_date.getTime())continue
      tmp.date.push(i)
      var tmpArray = []
      //时间排序
      var sortTime = Object.keys(item.TimeTable[i]).sort()
      //枚举所有时间
      for(var sj = 0;sj<sortTime.length;sj++){
        j = sortTime[sj]
        if(item.TimeTable[i][j]!=1&&item.TimeTable[i][j]!=2)continue
        tmpArray.push(j)
      }
      tmp.time[i] = tmpArray
    }
    /**添加其他日期----------------------------------------------- */

    tmp.date.push("Others")
    tmp.time["Others"] = ["Others"]

    /**---------------------------------------------------------- */

    timeTable[item.Name] = tmp
  })
  return {
    teacher:teacherList,
    dateTime:timeTable
  }
}