// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境

var result = {
    teacherList:["A"],
    timeList:[{
        teacher:"A",                        //老师
        headerDate:["21/09","23/09"],       //有多少天
        tableDate:[{                        //每行数据
            "time":"14:00-14:30",           //时间粒度
            "status":[
                0,1               //状态
            ]
        },{
            "time":"14:30-15:00",
            "status":[
                1,0
            ]
        },{
            "time":"15:00-15:30",
            "status":[
                1,0
            ]
        },{
        "time":"15:30-16:00",
        "status":[
            1,0
        ]
        },{
        "time":"16:00-16:30",
        "status":[
            1,0
        ]
        },{
        "time":"16:30-17:00",
        "status":[
            1,0
        ]
        }]
    }]
}

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return result;
}