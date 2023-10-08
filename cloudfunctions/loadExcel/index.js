// 云函数入口文件
const cloud = require('wx-server-sdk')
const xlsx = require('node-xlsx')
const moment = require('moment')

const mapName = {
  "教师姓名":"Name",
  "教师SCNU账号":"SCNUID",
  "教师手机号":"CommunicationMethod",
  "中文备注":"zh_cn_Note",
  "英文备注":"en_Note",
  "中文地点":"zh_cn_Place",
  "英文地点":"en_Place"
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
  const _ = db.command

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  console.log("下载的文件->",res)
  var files = (xlsx.parse(res.fileContent,{cellDates:true}))
  console.log(files)
  
  //读取sheet1
  var sheet1 = files[0].data
  var teacherObjList = []
  var teacherName = []
  for(var i=1;i<sheet1.length&&sheet1[i].length;i++){
    if(!sheet1[i])break
    var teacherObj = {}
    teacherName.push(_.eq(sheet1[i][0]))
    for(var j=0;j<sheet1[i].length&&sheet1[i][j];j++){
      teacherObj[mapName[sheet1[0][j]]] = sheet1[i][j].toString()
    }
    teacherObjList.push(teacherObj)
  }
  
  var nameAgain = await db.collection('teachers')
  .aggregate()
  .match({
    Name:_.or(teacherName)
  })
  .project({
    _id:0,
    Name:1
  })
  // .field({
  //   Name:true
  // })
  .end()

  var addName = teacherObjList.filter(item1=>{
    return nameAgain.list.every(item2=>{
      return item2.Name != item1.Name
    })
  })

  var addUserInfo = addName.map(item=>{
    if(nameAgain.list.every(item2=>{
      return item2.Name != item.Name
    })){
      return {
        Credit:2,
        Name:item.Name,
        PhoneNum:item.CommunicationMethod,
        StudentID:item.Name,
        TimesOfAppointment:0,
        language:0,
        OpenID:""
      }
    }
  })

  console.log('addUserInfo->',addUserInfo)
  //添加老师
  if(addName.length){
    await db.collection('teachers').add({
      data:addName
    })
    await db.collection('userInfo').add({
      data:addUserInfo
    })
  }
  //添加时间表
  teacherName = []
  var tableobjtList = {}
  for(var i=1;i<files.length;i++){
    var sheet = files[i].data
    var tName = sheet[0][0]
    teacherName.push(_.eq(tName))
    var timeobj = {}
    var tableobj = {}
    for(var j=1;j<sheet.length&&sheet[j].length;j++){
      if(!/^(0[0-9]|1[0-9]|2[0-4])\:([0-6][0-9])\-(0[0-9]|1[0-9]|2[0-4])\:([0-6][0-9])$/.test(sheet[j][0]))
        return {
          success:0,
          message:"格式错误"
        }
      timeobj[sheet[j][0]] = 1
    }
    for(var j=1;j<sheet[0].length&&sheet[0][j];j++){
      if(!/^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/.test(sheet[0][j]))
        return {
          success:0,
          message:"格式错误"
        }
      var key = sheet[0][j].split('.')
      tableobj[`${key[1]}/${key[2]}`] = timeobj
    }
    tableobjtList[tName] = tableobj
  }

  //批量更新时间
  var datas = await db.collection('teachers').aggregate()
  .match({Name:_.or(teacherName)})
  .project({_id:1,Name:1})
  .end()
  console.log(datas)
  const tasks = datas.list.map(async item=>{
    return await db.collection('teachers').doc(item._id).update({
      data:{
        TimeTable:tableobjtList[item.Name]
      }
    })
  })

  const results = [];

  while(tasks.length){
    const batchTasks = tasks.splice(0,7);
    const r = await Promise.all(batchTasks);
    results.push(res)
  }

  return {
    success:1,
    message:"添加成功"
  }
}