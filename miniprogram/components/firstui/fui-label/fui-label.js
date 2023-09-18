// 本文件由FirstUI授权予杨方安（手机号：189 38 6  3 1 5   9 3，身份证尾号： 1 84   931）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
let relations = {};
const children = [
  'fui-radio',
  'fui-checkbox',
  'fui-switch'
]
children.map((name) => {
  relations[`../${name}/${name}`] = {
    type: 'descendant',
    linked: function (target) {
      this.data.childrens.push(target)
    }
  }
})
Component({
  properties: {
    //padding值
    padding: {
      type: String,
      value: "0"
    },
    //margin值
    margin: {
      type: String,
      value: "0"
    },
    full: {
      type: Boolean,
      value: false
    },
    inline: {
      type: Boolean,
      value: false
    }
  },
  relations: {
    ...relations
  },
  data: {
    childrens: []
  },
  methods: {
    onClick() {
      if (this.data.childrens && this.data.childrens.length > 0) {
        for (let child of this.data.childrens) {
          child.labelClick()
        }
      }
    }
  }
})