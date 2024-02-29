// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const wxContext = cloud.getWXContext()
const db = cloud.database()
const _  = db.command
const $ = _.aggregate

//日期
// const today = new Date()
// const laterDay = new Date()
// laterDay.setDate(today.getDate() + 14)

// 云函数入口函数
exports.main = async (event, context) => {
  var teacherList = []
  var timeList = []

  var result = await db.collection('teachers').get()
  //获取所有教师和日期
  /**枚举所有教师------------------------------------------------------- */
  result.data.forEach(item=>{
    var tmp = {
      teacher:{
        Name:item.Name,
        zh_cn_place:item.zh_cn_Place,
        en_place:item.en_Place
      },
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
      /** 计算日期是否在范围内------------------------------------- */
      var date = sortTimeTable[the_date]
      //算时间
      var year = date.split("/")[0]
      var month = date.split("/")[1]
      var day = date.split("/")[2]
      var dateTime = new Date(`${year}-${month}-${day}T24:00:00`)
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
      /**--------------------------------------------------------- */

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
    if(tmp.headerDate.length){
      timeList.push(tmp)
      teacherList.push({
        Name:item.Name,
        zh_cn_place:item.zh_cn_Place,
        en_place:item.en_Place
      })
    }
  })
  return {
    teacherList:teacherList,
    timeList:timeList
  }
}
