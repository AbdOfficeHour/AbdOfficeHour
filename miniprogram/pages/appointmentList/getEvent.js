const db = wx.cloud.database()
const _ = db.command
var util = require('../../utils/util')

async function main(pages=1,searchT="",searchS=""){
	var skips = (pages-1)*10
	if(searchT==""&&searchS==""){
		return Array.from((await db
			.collection("events")
			.skip(skips)
			.limit(10)
			.orderBy('state','asc')
			.orderBy('dateTime','asc')
			.get())
			.data,
			(item)=>{
				item.dateTime = util.formatTime(item.dateTime)
				return item
			})
	}
	else{
    var condintion = {all:_.and(_.or({
        Student:{
        $regex:".*"+searchS+".*",
        $options: 'i'
        }
      },{
      StudentID:{
        $regex:".*"+searchS+".*",
        $options: 'i'
      }
      }),{
      teacher:searchT
      }),
      teacher:{teacher:_.eq(searchT)},
      student:_.or({
        Student:{
        $regex:".*"+searchS+".*",
        $options: 'i'
        }
      },{
      StudentID:{
        $regex:".*"+searchS+".*",
        $options: 'i'
      }
      })
    }

    var S
    if(searchT=="")S = condintion.student
    else if(searchS=="")S = condintion.teacher
    else S = condintion.all

		return Array.from((await db.collection("events").where(S)
			.skip(skips)
			.limit(10)
			.orderBy('state','asc')
			.orderBy('dateTime','asc')
			.get()).data,
			(item)=>{
				item.dateTime = util.formatTime(item.dateTime)
				return item
			})
	}
}

module.exports.main = main