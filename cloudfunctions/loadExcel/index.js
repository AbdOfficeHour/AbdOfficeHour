// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
const moment = require('moment')

const mapName = {
  "教师姓名":"Name",
  "教师SCNU账号":"SCNUID",
  "教师手机号":"CommunicationMethod",
  "备注":"Note",
  "地点":"Place"
}

const mapUser = {
  "教师姓名":"Name",
  "教师SCNU账号":"StudentID",
  "教师手机号":"PhoneNum"
}

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const db = cloud.database()
  const fileID = event.fileID

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
      teacherObj[mapName[sheet1[0][j]]] = sheet1[i][j].toString()
    }
    teacherObjList.push(teacherObj)
  }
  for(var i in teacherObjList){
    await db.collection('teachers').where({
      Name:teacherObjList[i].Name
    })
    .get()
    .then(async(res)=>{
      if(res.data.length){
        await db.collection('teachers')
        .doc(res.data[0]._id)
        .update({
          data:teacherObjList[i]
        })
      }else{
        await db.collection('teachers').add({
          data:teacherObjList[i]
        }).then(async(res)=>{
          await db.collection('userInfo').add({
            data:{
              Credit:2,
              Name:teacherObjList[i].Name,
              PhoneNum:teacherObjList[i].CommunicationMethod,
              StudentID:teacherObjList[i].SCNUID,
              TimesOfAppointment:0,
              language:0,
              OpenID:""
            }
          })
        })
      }
    })
  }

  //添加时间表
  for(var i=1;i<files.length;i++){
    var sheet = files[i].data
    var tName = sheet[0][0]
    var timeobj = {}
    var tableobj = {}
    for(var j=1;j<sheet.length&&sheet[j].length;j++){
      timeobj[sheet[j][0]] = 1
    }
    for(var j=1;j<sheet[0].length&&sheet[0][j];j++){
      var key = sheet[0][j].split('.')
      tableobj[`${key[1]}/${key[2]}`] = timeobj
    }
    await db.collection("teachers").where({
      Name:tName
    })
    .update({
      data:{
        TimeTable:tableobj
      }
    })
  }

  return {
    success:1,
    message:"添加成功"
  }
}