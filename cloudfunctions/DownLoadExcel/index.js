// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require("node-xlsx")

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

const states = {
  [2]:"申请中",
  [3]:"已通过",
  [4]:"已拒绝",
  [5]:"已完成",
  [6]:"已撤回",
  [7]:"已超时"
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const _ = db.command

  var events = (await db.collection("events").get()).data

  var date = new Date()
  var dataCVS = `events/${date.getTime()}.xlsx`

  var allData = []
  var row = ["教师","学生","日期","时间","备注","状态"]
  allData.push(row)
  for(var i = 0;i<events.length;i++){
    var arr = []
    arr.push(events[i].teacher)
    arr.push(events[i].Student)
    arr.push(`${events[i].dateTime.getMonth()}/${events[i].dateTime.getDate()}`)
    arr.push(events[i].time)
    arr.push(events[i].Note)
    arr.push(states[events[i].state])
    allData.push(arr)
  }

  var buffer = await xlsx.build([{
    name:"sheet1",
    data:allData
  }])

  console.log(allData)
  console.log(dataCVS)
  return await cloud.uploadFile({
    cloudPath:dataCVS,
    fileContent:buffer
  })
}