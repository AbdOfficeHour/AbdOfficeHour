// 云函数入口文件
const cloud = require('wx-server-sdk')
const nodemailer = require('nodemailer')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let transporter = nodemailer.createTransport({
    host:"smtp.exmail.qq.com",
    port: 465,
    secure: true,
    auth:{
      user:"20223803053@m.scnu.edu.cn",
      pass:"iqHdBWmhyGHdV4fg"
    }
  })

  transporter.verify(function (error,success){
    console.log(error)
  })

  let postMag = {
    from:event.from,
    to:event.to,
    subject:event.subject,
    text:event.text
  }

  let res = await transporter.sendMail(postMag)


  return res
}