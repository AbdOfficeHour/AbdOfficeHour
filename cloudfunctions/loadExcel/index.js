// 云函数入口文件
const cloud = require('wx-server-sdk')

const xlsx = require('node-xlsx')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const fileID = "cloud://cloud1-7gq5naln5bf65474.636c-cloud1-7gq5naln5bf65474-1321030591/测试用.xlsx"

  const res = await cloud.downloadFile({
    fileID:fileID
  })

  console.log("下载的文件->",res)
  var files = xlsx.parse(res.fileContent)

  console.log(files)
  return {
    event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}