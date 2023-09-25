// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
const moment = require('moment')

const mapName = {
  "教师姓名":"Name",
  "教师SCNU账号":"SCNUID",
  "教师手机号":"phoneNum"
}

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const fileID = "cloud://cloud1-7gq5naln5bf65474.636c-cloud1-7gq5naln5bf65474-1321030591/Example.xlsx"

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  console.log("下载的文件->",res)
  var files = (xlsx.parse(res.fileContent,{cellDates:true}))
  console.log(files)
  
  //读取sheet1
  var sheet1 = files[0].data
  var teacherObjList = []
  for(var i=1;i<sheet1.length&&sheet1[i].length;i++){
    if(!sheet1[i])break
    var teacherObj = {}
    for(var j=0;j<sheet1[i].length&&sheet1[i][j];j++){
      teacherObj[mapName[sheet1[0][j]]] = sheet1[i][j]
    }
    teacherObjList.push(teacherObj)
  }

  console.log(teacherObjList)
  
}