// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  //获取数据库信息
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const userCollection = db.collection('userInfo')
  //获取注册信息，有学生和教师两种
  const {language,phonenumber,StudentID,ABDID,flag,Name} = event
  const OpenID = wxContext.OPENID
  const RegisterFlag = flag
  var result
  if(StudentID){
    result = await userCollection.where({StudentID:StudentID}).get()
  }
  else{
    result = await userCollection.where({Name:Name}).get()
  }
  const phone = String(result.data[0].PhoneNum)
  const oid2 = result.data[0].OpenID
    if (phone == phonenumber && RegisterFlag == "1" && oid2 == "") {
      if(StudentID){
        await userCollection.where({StudentID:StudentID}).update({data:{OpenID:OpenID,language:language}}).then(res=>{
          console.log(res)
        })
      }else{
        await userCollection.where({Name:Name}).update({data:{OpenID:OpenID,     language:language}}).then(res=>{
          console.log(res)
        })
      }

      var res = await userCollection.where({OpenID:OpenID}).get()

      if(res.data[0].Credit==2){
        await db.collection('teachers').where({Name:res.data[0].Name}).update({
          data:{
            OpenID:OpenID
          }
        })
      }

      return {
        code: "2",
        message: '用户信息注册成功'
      }
    } else if(phone == phonenumber && RegisterFlag == "0" && result.data[0].OpenID == OpenID){
      return {
        code: "0",
        message: '用户信息匹配成功'
      }
    }else{
      return {
        code:"-1",
        message:"用户信息匹配失败"
      }
    }

  return {
    event:event,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
    code: -1,
    message: '出现错误，请稍后重试'
  }
}