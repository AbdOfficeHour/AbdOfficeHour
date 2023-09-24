// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const wxContext = cloud.getWXContext()
const db = cloud.database()
const _  = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  var teacherList = []
  var timeList = []
  var result = await db.collection('teachers').get()
  //获取所有教师和日期
  result.data.forEach(item=>{
    teacherList.push(item.Name)
    var tmp = {
      teacher:item.Name,
      headerDate:[],
      tableDate:[]
    }

    //标记，用来标记是否是第一次录入时间段
    var flag = 0

    //计算日期
    var today = new Date()
    var endday = new Date()
    endday.setDate(today.getDate()+14)
    //排序
    var sortTimeTable= Object.keys(item.TimeTable).sort()
    //遍历TimeTable
    for(var the_date=0;the_date<sortTimeTable.length;the_date++){
      var date = sortTimeTable[the_date]
      //算时间
      var month = date.split("/")[0]
      var day = date.split("/")[1]
      var dateTime = new Date(`${today.getFullYear()}-${month}-${day}T24:00:00`)
      if(dateTime>=today&&dateTime<=endday)
      {
        tmp.headerDate.push(date)
      }else if(dateTime>endday){
        //超过14天就没必要看了
        break
      }else{
        //不合规直接到下一个
        continue
      }


      var sortTimePoint = Object.keys(item.TimeTable[date]).sort()
      //寻找时间粒度
      for(var i = 0;i<sortTimePoint.length;i++)
      {
        var timePoint = sortTimePoint[i]
        if(flag==0){
          tmp.tableDate.push({
            "time":timePoint,
            "status":[item.TimeTable[date][timePoint]]
          })
        }else{
          tmp.tableDate[i].status.push(item.TimeTable[date][timePoint])
        }
      }
      flag = 1
    }

    timeList.push(tmp)
  })
  return {
    teacherList:teacherList,
    timeList:timeList
  }
}
