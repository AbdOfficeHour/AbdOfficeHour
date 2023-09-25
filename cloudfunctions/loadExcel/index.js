// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
const moment = require('moment')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const fileID = "cloud://cloud1-7gq5naln5bf65474.636c-cloud1-7gq5naln5bf65474-1321030591/测试用.xlsx"

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  console.log("下载的文件->",res)
  var files = (xlsx.parse(res.fileContent,{cellDates:true}))[0].data

  var T,times
  T = files[0][0]
  times = 1
  for(var i=0;i<T;i++){
    var name = files[times][0]
    var N = files[times][1]
    times++
    var tmp = {}
    for(var j=0;j<N;j++){
      var dateContext = moment(files[times][0]).add(1,'days').format("MM/DD")
      tmp[dateContext] = {}
      files[times].forEach(item=>{
        if(typeof item=="string")
        {
          tmp[dateContext][item] = 1
        }
      })
      times++
    }

    await db.collection("teachers").where({Name:name}).update({
      data:{
        TimeTable:tmp
      }
    })
  }


  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}