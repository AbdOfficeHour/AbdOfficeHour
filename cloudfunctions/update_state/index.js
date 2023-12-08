// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
const db = cloud.database()
const _ = db.command
//格式化时间
function formateDateTime(dateS,timeS){
  dataS = dataS.replaceAll("/","-")
  return new Date(`${dataS}T${timeS.split("-")[1]}`)
}
function DateToString(date){
  return `${date.getFullYear()}/${date.getMonth()>8?'':0}${date.getMonth()+1}/${date.getDate()>9?'':0}${date.getDate()}`
}

//返回对象
class returnValue{
  constructor(success,msg){
    this.success = success
    this.message = msg
  }
}

//所有的状态
class Waiting{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    if(code==3)return await this.pass()
    else if(code==4)return await this.refuse(reasons_for_refusal)
    else if(code==6)return await this.revocate()
    else return new returnValue(0,"状态异常")
  }
  async pass(){
    await db.collection("events").doc(this.data._id).update({
      data:{
        state:3
      }
    })
    await db.collection("events").where({
      OpenIDOfStudent:_.neq(this.data.OpenIDOfStudent),
      dateTime:this.data.dateTime,
      time:this.data.time,
      TeacherID:this.data.TeacherID
    }).update({
      data:{
        state:4,
        reasons_for_refusal:"此时间段教师已同意其他学生，系统自动拒绝"
      }
    })
    await db.collection("teachers").doc(this.data.TeacherID).update({
      data:{
        TimeTable:{
          [DateToString(this.data.dateTime)]:{
            [this.data.time]:3
          }
        }
      }
    })
    return new returnValue(1,"成功")
  }
  async refuse(reasons_for_refusal){
    await db.collection("events").doc(this.data._id).update({
      data:{
        state:4,
        reasons_for_refusal:reasons_for_refusal
      }
    })
    let n = await db.collection("events").where({
      OpenIDOfStudent:_.neq(this.data.OpenIDOfStudent),
      dateTime:this.data.dateTime,
      time:this.data.time,
      TeacherID:this.data.TeacherID,
      state:_.or([2,3])
    }).count()
    console.log(n)
    if(!n.total){
      await db.collection("teachers").doc(this.data.TeacherID).update({
        data:{
          TimeTable:{
            [DateToString(this.data.dateTime)]:{
              [this.data.time]:1
            }
          }
        }
      })
    }
    return new returnValue(1,"成功")
  }
  async revocate(){
    await db.collection("events").doc(this.data._id).update({
      data:{
        state:6
      }
    })
    let n = await db.collection("events").where({
      OpenIDOfStudent:_.neq(this.data.OpenIDOfStudent),
      dateTime:this.data.dateTime,
      time:this.data.time,
      TeacherID:this.data.TeacherID,
      state:_.or([2,3])
    }).count()
    if(!n.total){
      await db.collection("teachers").doc(this.data.TeacherID).update({
        data:{
          TimeTable:{
            [DateToString(this.data.dateTime)]:{
              [this.data.time]:1
            }
          }
        }
      })
    }
    return new returnValue(1,"成功")
  }
}

class Pass{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    if(code==5)return await this.complete(workSummary)
    else if(code==6)return await this.revocate()
    else return new returnValue(0,"状态异常")
  }
  async complete(workSummary){
    await db.collection("events").doc(this.data._id).update({
      data:{
        state:5,
        workSummary:workSummary
      }
    })
    return new returnValue(1,"成功")
  }
  async revocate(){
    await db.collection('events').doc(this.data._id).update({
      data:{
        state:6
      }
    })
    await db.collection('teachers').doc(this.data.TeacherID).update({
      data:{
        TimeTable:{
          [DateToString(this.data.dateTime)]:{
            [this.data.time]:1
          }
        }
      }
    })
    return new returnValue(1,"成功")
  }
}

class Refuse{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    if(code==6)return this.revocate()
    return new returnValue(0,"状态异常")
  }
  async revocate(){
    await db.collection('events').doc(this.data._id).update({
      data:{
        state:6
      }
    })
    return new returnValue(1,"成功")
  }
}

class Complete{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    return new returnValue(0,"状态异常")
  }
}

class Revocation{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    return new returnValue(0,"状态异常")
  }
}

class Delete{
  constructor(data){
    this.data = data
  }
  async update(code,workSummary,reasons_for_refusal){
    return new returnValue(0,"状态异常")
  }
}


allstate = {
  [2]:Waiting,
  [3]:Pass,
  [4]:Refuse,
  [5]:Complete,
  [6]:Revocation,
  [7]:Delete
}

async function getState(_id){
  return await db.collection("events").doc(_id).get()
  .then(res=>{
    return new allstate[res.data.state](res.data)
  })
}

class stateController{
  constructor(state){
    this.state = state
  }

  async excute(code,workSummary,reasons_for_refusal){
    return await this.state.update(code,workSummary,reasons_for_refusal)
  }
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  //获取数据
  const id = event._id
  const state = event.state
  const workSummary = event.workSummary?event.workSummary:""
  const reasons_for_refusal = event.reasons_for_refusal?event.reasons_for_refusal:""

  let the_state = await getState(id)

  let controller = new stateController(the_state)

  return await controller.excute(state,workSummary,reasons_for_refusal)

}